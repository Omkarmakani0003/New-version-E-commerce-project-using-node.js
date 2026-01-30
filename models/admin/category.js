const mongoose = require('mongoose')

const category = new mongoose.Schema({
    category_name:{
        type : String,
        require : true,
        unique: true
    },
    image: [
       {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      }
    ],
    status:{
        type : Boolean,
        require : true
    },

},
  {timestamps: true}
) 
module.exports.category = mongoose.model('category',category)

