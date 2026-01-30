const {category} = require('../models/admin/category')
const { user } = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {cart} = require('../models/cart') 

exports.LoginForm = async(req,res) => {
   const categories = await category.find();
   
   let cartCout = 0
   if(req.user == undefined){
       cartCout = 0
   }else{
       cartCout = await cart.countDocuments({user_id:req.user._id})
   }
     
   res.render('login',{user:req.user,categories, error: req.flash('errors'),success: req.flash('success'),route: req.path || '',cartcount : cartCout})
}

exports.login = async(req,res) => {
     try{
          const {email,password} = req.body;
    
          if(!email || !password){
             req.flash('errors',"Email and password are required")
             return res.redirect('/login')
          }
          const User = await user.findOne({email})
          
          if(!User){
             req.flash('errors',"Incorrect credentials")
             return res.redirect('login')
          }

           const password_verify = await bcrypt.compare(password,User.password)
           
           if(!password_verify){
             req.flash('errors',"Incorrect credentials")
             return res.redirect('login')
           }
           const playload = {
               id: User._id,
               name : User.name,
               email : User.email
           }
           
           const token = jwt.sign(playload,process.env.JWTSECRET,{expiresIn:'1d'})
           res.cookie('user_token',token,{ httpOnly: true })
           req.user = User
           
           if(!User.is_varify){
             req.flash('errors',"Please varify your email")
             return res.status(401).redirect('/otp')
           }

           req.flash('success',"User login successfully")
           return res.redirect('/')

     }catch (e){
          console.log(e.message)
     }
}

exports.logout = async(req,res) => {
    res.clearCookie('user_token')
    req.user = ''
    return res.redirect('/')
}