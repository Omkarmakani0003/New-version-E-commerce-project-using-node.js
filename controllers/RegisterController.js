const {category} = require('../models/admin/category')
const { user } = require('../models/users')
const { otp } = require('../models/otp')
const {SendOtp} = require('../utils/sendOtp')
const { validationResult } = require("express-validator");
const bcrypt = require('bcrypt')
const { mailSender } = require('../utils/mailSender') 
const {cart} = require('../models/cart') 

exports.RegisterForm = async(req,res) => {
   const categories = await category.find();
   const cartCout = await cart.countDocuments({user_id:req.user._id}) 
   res.render('register',{user:req.user,categories, error: req.flash("errors"), oldInput: req.flash("oldInput"),cartcount : cartCout,route: req.path || ''})
}

exports.Register = async(req,res) => {
   
   try{
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
         req.flash("oldInput", req.body);
         errors.array().forEach((e) => {
            req.flash("errors", e);
         });
         return res.redirect("/user-register");
      }
 
      const User = await user.findOne({ email : req.body.email });

      if(User && User.length > 0){
         req.flash("oldInput", req.body);
         req.flash("errors", {path:"email",msg:'Email is already taken'})
         return res.redirect("/user-register");
      }
      const HashPassword = await bcrypt.hash(req.body.password,10)

      const register = await user.create({
         name : req.body.fullName,
         email : req.body.email,
         contact : req.body.contact,
         city : req.body.city,
         state : req.body.state,
         address :req.body.address,
         password : HashPassword,
         is_varify : false,
      })

      const send = await SendOtp(register.email)

      if(!send){
         req.flash("errors", {message:`Failed to send otp`})
         return res.redirect("/user-register");
      }

      req.flash("success", {message:`Otp sent On  ${ register.email }`})
      req.session.email = register.email
      return res.redirect("/otp"); 

   }catch(error){
      console.error(error.message)
   } 
}

exports.OtpVarify = async(req,res) => {
    const categories = await category.find();
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    if(req.session.email != undefined || req.session.email != null){
        res.render('otpverify',{user:req.user || '', categories, error: req.flash("errors"), success: req.flash("success"), route: req.path || '', email: req.session.email,cartcount : cartCout})
    }

    if(req.user != undefined || req.user != null){
        if(req.user.is_varify == false){
           res.render('otpverify',{user:req.user || '', categories, error: req.flash("errors"), success: req.flash("success"),route: req.path || '', email: req.session.email,cartcount : cartCout})
        }
    }
   
    res.redirect('back')
}

exports.resendOtp = async(req,res)=>{

   const send = await SendOtp(req.params.email)
   if(!send){
      req.flash("errors", {message:`Failed to send otp`})
      return res.redirect("/otp");
   }
   req.flash("success", {message:`Otp resent On  ${ req.params.email }`})
   req.session.email = req.params.email
   return res.redirect("/otp"); 

}

exports.Varify = async(req,res) => {

   const email = req.params.email
   const userOtp = req.body.otp.join('')

   const Otp = await otp.findOne({ email });

   if(userOtp == '' || userOtp == null || userOtp == undefined){
      req.flash("errors",{message:'Enter your otp'})
      return res.redirect("/otp");
   }

   if(!Otp){
      req.flash("errors", {message:'User not found'})
      return res.redirect("/otp");
   }

   if(userOtp != Otp.otp){
      req.flash("errors", {message:'Enter valid otp'})
      return res.redirect("/otp");
   }

   if(Otp.expiryAt < new Date()){
      req.flash("errors", 'Otp Expired')
      return res.redirect("/otp");
   }

   const varified = await user.findOne({email : email})

   if(varified.is_varify){
      
      await otp.findOneAndUpdate(
        { email },
        { $set: {otp : ''}},        
      )

       req.session.email = email
       return res.redirect('/password-reset')
   }
   

   const User = await user.findOneAndUpdate(

      { email: email },   
      { $set: {is_varify : true} },        
      {
         new: true,                 
         upsert: true,              
         runValidators: true
      }
   );

   if(User){
      await otp.findOneAndUpdate(
        { email },
        { $set: {otp : ''}},        
        {
           new: true,                 
           upsert: true,              
           runValidators: true
        }
      )

      

      req.flash("success", {message:'Email varify successfully'})
      return res.redirect("/login");
   }

}