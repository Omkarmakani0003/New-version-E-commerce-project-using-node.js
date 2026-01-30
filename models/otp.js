const mongoose = require('mongoose')

const otp = new mongoose.Schema({
    otp:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true
    },
    expiryAt:{
        type : String,
    },
},
  {timestamps: true}
) 
module.exports.otp = mongoose.model('otp',otp)

