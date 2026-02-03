const {user} = require('../../models/users')
const {orders} = require('../../models/order')

exports.payment = async(req,res) => {
    const payment = await orders.find({})
    res.render('admin/payments',{payment})
}