const {cart} = require('../models/cart') 
const {category} = require('../models/admin/category')
const {orders} = require('../models/order')

exports.Orders = async(req,res) => {
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find()
    const order = await orders.find({user_id:req.user._id}).populate('items.product_id')
    res.render('orders',{user:req.user,categories,route: req.path || '',cartcount : cartCout,order})
}

exports.OrderSuccess = async(req,res)=>{
    if(!req.session.order){
        return res.redirect('/orders')
    }
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find() 
    const orders = req.session.order || []
    res.render('success',{user:req.user,categories,route: req.path || '',cartcount : cartCout,orders})
}

exports.ViewOrders = async(req,res)=>{
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find() 
    const order = await orders.findById(req.params.id).populate('items.product_id') 
    res.render('view_order',{user:req.user,categories,route: req.path || '',cartcount : cartCout,order})
}

exports.track = async(req,res)=>{
    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find() 
    const order = await orders.findById(req.params.id)
    res.render('order_track',{user:req.user,categories,route: req.path || '',cartcount : cartCout,order})
}