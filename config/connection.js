const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

exports.connection = ()=> {
    try{
      mongoose.connect(process.env.DBURI)
     .then(()=>{ console.log('db connected successfully') })
     .catch(()=>{ console.log('Something went wrong')  })
    }catch(e){
      console.log(e)
    }
} 
