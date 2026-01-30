const {admin} = require('../models/admin/adminModel')
const { user } = require('../models/users')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()

exports.CheckAdminAuth = async(req,res,next) =>{
    const token = req.cookies.admin_token
    if(!token){
        return res.redirect('/admin/login')
    }
    try{
        const check = await jwt.verify(token,process.env.JWTSECRET)
        if(!check){
            req.flash('errors',"check feild")
            return res.status(401).redirect('login')
        }
        const admins = await admin.findById(check.id)
        if(!admins){
            req.flash('errors',"admin not found")
            return res.status(401).redirect('/admin/login')
        }
        req.admin = admins
        next()
    }catch(error){
        if(error.message){
            res.clearCookie('token');
            return res.redirect('/admin/login')
        }
    }
}

exports.CheckUserAuth = async(req,res,next) =>{
    const token = req.cookies.user_token
    if(!token){
        return res.redirect('/login')
    }
    try{
        const check = await jwt.verify(token,process.env.JWTSECRET)
        if(!check){
            req.flash('errors',"check feild")
            return res.status(401).redirect('/login')
        }
        const User = await user.findById(check.id)
        if(!User){
            req.flash('errors',"User not found")
            return res.status(401).redirect('/login')
        }

        if(!User.is_varify){
            req.flash('errors',"Please varify your email")
            return res.status(401).redirect('/otp')
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