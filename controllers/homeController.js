var express = require('express');
const {category} = require('../models/admin/category')
const {subcategory} = require('../models/admin/subcategory')
const {product} = require('../models/admin/product')
const {cart} = require('../models/cart')
const {slider} = require('../models/slider') 

exports.HomePage = async(req,res) => {
     try{
          if(req.session.order){
             delete req.session.order
          }
           
         const categories = await category.find(); 
         const productCount = await Promise.all(
            categories.map(async(category)=>{
             return await product.countDocuments({category_id:category._id})
            })
         )
         const products = await product.aggregate([ { $sample: { size: 8 } } ])
         const recentProducts = await product.aggregate([ { $sample: { size: 8 } } ])
         const cartCout = await cart.countDocuments({user_id:req.user._id}) 
         const sliders = await slider.find()
         res.render('index',{user: req.user,categories,productCount,products,recentProducts,sliders,success:req.flash('success'),search:'',route: req.path || '', cartcount : cartCout}); 
     }catch(error){
          console.log(error.message)
     }
   
}  
