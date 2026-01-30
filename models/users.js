const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },
    email:{
        type : String,
        require : true,
    },
    contact:{
        type : Number,
        require : true
    },
    address:{
        type : String,
        require : true
    },
    city:{
        type : String,
        require : true
    },
    state:{
        type : String,
        require : true
    },
    is_varify:{
        type : Boolean,
        require : true,
        default : false
    },
    password:{
        type : String,
        require : true
    },
},
  {timestamps: true}
) 
module.exports.user = mongoose.model('user',user)

