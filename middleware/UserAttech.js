const { user } = require('../models/users')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

exports.UserAttech = async(req,res,next) =>{

    const token = req.cookies.user_token
    let User = ''
    try{

    if(token){
        const check = await jwt.verify(token,process.env.JWTSECRET) 
        User = await user.findById(check.id)

        if(!User.is_varify){
           req.flash('errors',"Please varify your email")
           return res.status(401).redirect('/otp')
        }
    }
    
    req.user = User
    next()

    }catch(error){
        if(error.message){
            res.clearCookie('token');
            return res.redirect('login')
        }
    }
}