const bcrypt = require('bcrypt')
const {admin} = require('../../models/admin/adminModel')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
const {user} = require('../../models/users')
const {product} = require('../../models/admin/product')
const {orders} = require('../../models/order')
dotenv.config()

exports.loginform = (req,res) => {
   res.render('admin/login',{error : req.flash('errors')});
}

exports.login = async(req,res) => {
     try{
          const {email,password} = req.body;
    
          if(!email || !password){
             req.flash('errors',"Email and password are required")
             return res.redirect('/admin/login')
          }
          const isExist = await admin.findOne({email})
          
          if(!isExist){
             req.flash('errors',"Email or password incorrect")
             return res.redirect('/admin/login')
          }

           const password_verify = await bcrypt.compare(password,isExist.password)
           
           if(!password_verify){
             req.flash('errors',"Email or password incorrect")
             return res.redirect('/admin/login')
           }
           const playload = {
               id: isExist._id,
               name : isExist.name,
               email : isExist.email
           }

           const token = jwt.sign(playload,process.env.JWTSECRET,{expiresIn:'1d'})
           res.cookie('admin_token',token,{ httpOnly: true })
           
           req.flash('success',"Admin login successfully")
           return res.redirect('/admin/')

     }catch (e){
          console.log(e.message)
     }
}

exports.dashboard = async(req,res) => {
     const totalVerifiedUsers = await user.countDocuments({is_varify:true})
     const totalUnVerifiedUsers = await user.countDocuments({is_varify:false})
     const Totalproduct = await product.countDocuments()
     const TotalSales = await orders.aggregate([
                         { $match: { payment_status: "paid" } },
                              {
                                   $group: {
                                        _id: { $month: "$createdAt" },
                                        totalAmount: { $sum: "$total" }
                                   }
                              }
                         ]);                   
     const TotalOrders = await orders.countDocuments({ status: "delivered" })     
     const TotalCancelledOrders = await orders.countDocuments({ status: "cancelled" })          
     res.render('admin/dashboard',{totalVerifiedUsers,totalUnVerifiedUsers,Totalproduct,TotalSales,TotalOrders,TotalCancelledOrders,success : req.flash('success'),error : req.flash('errors')}); 
}  

exports.logout = (req,res) => {
    res.clearCookie('admin_token')
    req.admin = ''
    return res.redirect('/admin/login') 
}
