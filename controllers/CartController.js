const {cart} =require('../models/cart')
const {category} = require('../models/admin/category')

exports.AddToCart = async(req,res) => {
  
    if(!req.user){
        return res.status(400).json({success:false})
    }

    const {productId,quantity,price,variations} = req.body
    const userId = req.user._id

    const Cart = await cart.create({
         user_id : userId,
         items : [{ product_id : productId, variation : variations }],
         quantity : quantity,
         total :  price
    })

   const cartCount = await cart.countDocuments({user_id:req.user._id}) 
   
   return res.status(200).json({success:true,Cart,cartCount})
}

exports.DisplayCart = async(req,res) => {
     const categories = await category.find();
     const cartCout = await cart.countDocuments({user_id:req.user._id})  
     const cartItems = await cart.find({ user_id : req.user._id }).populate('items.product_id')
     delete req.session.buynow
     req.session.cart = cartItems
     res.render('cart',{user:req.user,categories, error: req.flash('errors'),route: req.path || '',cartcount : cartCout,cartItems})
}

exports.CartUpdate = async(req,res) => {
     
     try{
          const {id,quantity} = req.body

          if(!id || !quantity){
               return false
               // return res.status(400).json({success:false,message:'something went wrong'})
          }

          const Quantity = await cart.findByIdAndUpdate(id,{
               quantity
          },{ new: true })

          if(Quantity){
               return res.status(200).json({success:true,Quantity})
          }

     }catch(error){
         console.log(error.message)
     }
}

exports.CartRemove = async(req,res) => {
     const id = req.params.id

     if(!id){
         return res.status(400).json({success:false,message:'something went wrong'}) 
     }

     const RemoveCart = await cart.findByIdAndDelete(id).populate('items.product_id')

     if(!RemoveCart){
        return res.status(400).json({success:false,message:'something went wrong'})   
     }
     const shipping = RemoveCart.items[0].product_id.shipping_price   
     return res.status(200).json({success:true,RemoveCart,Shipping:shipping})
}