const {orders} = require('../../models/order')

exports.orders = async(req,res) => {
    const order = await orders.find();
    return res.render('admin/orders',{order})
}

exports.vieworder = async(req,res) => {
    const id = req.params.id
    if(!id){
        return res.redirect("back")
    }

    const order = await orders.findById(id).populate('items.product_id')
    return res.render('admin/view-order',{order})
}

exports.updateStatus = async(req,res) => {
   try {
        const {id,status} = req.body
   
        if(!id){
            return res.status(400).json({success:false,message:'something went wrong'})
        }

        if(!status){
            return res.status(400).json({success:false,message:'something went wrong'})
        }
 
        const payment = await orders.findById(id)

        if(payment.payment_status == 'failed'){
            return res.status(400).json({success:false,message:'User not paid amount for this product'})
        }
      
        const order = await orders.findByIdAndUpdate(id,{
            status,
            $addToSet: { steps: status }
        },
        {new : true}
        )

        if(order){
            res.status(200).json({success:true,data:order})
        }

   }catch(error){
     console.log(error.message)
   } 

}