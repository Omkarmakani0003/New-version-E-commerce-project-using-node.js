const mongoose = require('mongoose')

const VariationSchema = new mongoose.Schema({
     variation:{
        type: Array,
        // of: [String] 
    },
    product_id:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require : true
    },
    status:{
        type : Boolean,
        require : true
    },
    
},
  {timestamps: true}
) 
module.exports.variation= mongoose.model('Variation',VariationSchema)