const { render } = require('ejs')
const {user} = require('../../models/users')

exports.users = async(req,res) => {
    const users = await user.find() 
    return res.render('admin/users',{users})
}