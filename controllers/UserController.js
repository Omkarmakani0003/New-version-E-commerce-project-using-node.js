const { user } = require('../models/users')
const {cart} = require('../models/cart') 
const {category} = require('../models/admin/category')
const { validationResult } = require("express-validator");
const {SendOtp} = require('../utils/sendOtp')
const bcrypt = require('bcrypt')

exports.profile = async(req,res) => {
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find()
    return res.render('profile',{user:req.user,categories,success:req.flash('success'),route: req.path || '',cartcount : cartCout})
}

exports.UserUpdate = async(req,res) => {
   
   try{
      const errors = validationResult(req);

      console.log(errors)
      if (!errors.isEmpty()) {
         req.flash("oldInput", req.body);
         errors.array().forEach((e) => {
            req.flash("errors", e);
         });
        return res.redirect("back");
      }
 
      const User = await user.findById(req.user._id);
      User.contact = req.body.contact,
      User.city = req.body.city,
      User.state = req.body.state,
      User.address = req.body.address,
      User.save()
      req.flash("success", {message:"profile update successfully "})
      return res.redirect("back"); 

   }catch(error){
      console.error(error.message)
   } 
}

exports.emailVerification = async(req,res) => {
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find()
    const oldInput = req.flash("input");
    return res.render('email_verification',{user:req.user,categories,error:req.flash('error'),oldInput: oldInput.length > 0 ? oldInput[0] : {}, route: req.path || '',cartcount : cartCout})
}

exports.emailverify = async(req,res) => {
  
      if(!req.body.email){
         req.flash("error", {msg:'Email is required'})
         return res.redirect('back')
      }

      const User = await user.findOne({email : req.body.email});

      if(!User){
         req.flash("input", {email : req.body.email})
         req.flash("error", {msg:'User not found'})
         return res.redirect('back')
      }

      const send = await SendOtp(req.body.email)

      if(send){
         req.flash("success", {message:`Otp sent On  ${ req.body.email }`})
         const categories = await category.find();
         const cartCout = await cart.countDocuments({user_id:req.user._id}) 
         res.render('otpverify',{user:req.user || '', categories, error: req.flash("errors"), success: req.flash("success"), route: req.path || '', email: req.body.email,cartcount : cartCout})
      }

}

exports.passwordReset = async(req,res) => {
    const categories = await category.find();
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    res.render('password-reset',{user:req.user || '', categories, error: req.flash("error"), success: req.flash("success"), route: req.path || '', email: req.session.email || '',cartcount : cartCout})
}

exports.reset = async(req,res) => {
   const email = req.params.email
   const { newEmail,confirmEmail } = req.body

   if(!email || !newEmail || !confirmEmail){
      req.flash("error", {msg:'password and confirm password required'})
      return res.redirect("back")
   }

   if(newEmail !== confirmEmail){
      req.flash("error", {msg:'confirm password and password not match'})
      return res.redirect("back")
   }

   const User = await user.findOne({email : email});

   if(!User){
      req.flash("error", {msg:'user not found'})
      return res.redirect("back")
   }
   
   const HashPassword = await bcrypt.hash(newEmail,10)
   User.password = HashPassword
   User.save()
   req.flash("success", "Password reset successfully")
   return res.redirect("/login")
}