const {cart} = require('../models/cart') 
const {category} = require('../models/admin/category')
const {orders} = require('../models/order')
const Razorpay = require("razorpay");
const { mailSender } = require('../utils/mailSender') 
const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils")
const dotenv = require('dotenv');
dotenv.config()

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

exports.CheckOut = async(req,res) => {
    if(!req.session.cart && !req.session.buynow){
      res.redirect('back')
    }
    let cartItems = req.session.cart || req.session.buynow

    const cartCout = await cart.countDocuments({user_id:req.user._id}) 
    const categories = await category.find()
    
    res.render('checkout',{user:req.user,categories,route: req.path || '',cartcount : cartCout,cartItems,key:process.env.RAZORPAY_KEY_ID})
}

exports.placeOrder = async(req,res)=>{

    try{
      if(!req.session.cart && !req.session.buynow){
        res.redirect('/back')
      }
      let total = 0;
      const items = req.body.order.flatMap(order =>
        order.items.map(item => {
          const quantity = Number(item.quantity || order.quantity || 1);
          const price = Number(order.total || 0);
          const shipping = Number(item.product_id.shipping_price || 0);

          total += quantity * price + shipping;

          return {
            product_id: item.product_id._id,
            variation: item.variation || {},
            quantity,
            price
          };
        })
      );

    const options = {
        amount: total * 100, 
        currency: "INR",
        receipt: "receipt_" + Date.now()
    };

   const order = await razorpay.orders.create(options);
  
   const Orders = await orders.create({
       user_id : req.user._id,
       items : items,
       total : total,
       shipping_address : req.user.address +' '+ req.user.city +' '+ req.user.state,
       razorpay_order_id : order.id
     })
   
    if(!Orders){
        return res.status(400).json({success:false})
    } 
  
    const data = {
                'email' : req.user.email,
                'subject' : 'E-shop place order',
                'text' : `Your order placed successfully,
                          order_id is ${order.id}`
                }
    // await mailSender(data)

    delete req.session.checkout
    delete req.session.buynow

    res.json(order);
    
    }catch(error){
        console.log(error.message)
        res.status(500).send({err:error.message})

    }
}

exports.PaymentVarify = async(req, res) => {
  try{

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    payment_status
  } = req.body;

  if (payment_status === 'Failed') {
      await orders.findOneAndUpdate(
        { razorpay_order_id },
        { payment_status: 'failed'}
      );
    return res.status(400).json({ status: 'failed', message: 'Payment failed' });
  }

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const validate = validateWebhookSignature(sign, razorpay_signature, process.env.RAZORPAY_KEY_SECRET)

  if(validate){
      const order = await orders.findOneAndUpdate({razorpay_order_id:razorpay_order_id},{
                    razorpay_payment_id : razorpay_payment_id,
                    status : 'confirmed',
                    payment_status : 'paid'
                    },{ new: true })

        req.session.order = order

        const data = {
                'email' : req.user.email,
                'subject' : 'E-shop order and payment confirmation',
                'text' : `Your order and payment ${ order.total } successfully,
                          payment_id is ${razorpay_payment_id},`
                }

        // await mailSender(data)
        res.status(200).json({status : 'ok'})
      }else{
       const order = await orders.findOneAndUpdate({razorpay_order_id:razorpay_order_id},{
        razorpay_payment_id : razorpay_payment_id,
        payment_status : 'failed'
        },{ new: true })
        req.session.order = order
        res.status(400).json({status : 'failed'})
    }
  }catch(error){
      res.status(500).send({err:error.message})
  }
  
};