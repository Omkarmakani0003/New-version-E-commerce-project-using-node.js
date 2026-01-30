const {product} = require('../models/admin/product')
const {variation} = require('../models/admin/variation')
const {category} = require('../models/admin/category')
const {cart} = require('../models/cart') 

exports.ProductDetail = async(req,res)=>{
    try{
        const slug = req.params.slug
        const categories = await category.find();
        const products = await product.findOne({slug})
        const variations = await variation.findOne({ product_id : products._id})
        const cartCout = await cart.countDocuments({user_id:req.user._id})  
        const relatedProducts = await product.aggregate([
            {
            $match: {
            $or: [
                    { subcategory_id: products.subcategory_id },
                    { category_id: products.category_id }
                 ]
                }
            },
            { $sample: { size: 8 } } 
        ])
        const featuredProducts = await product.aggregate([
            {
            $match: {
            $or: [
                    { category_id: products.category_id }
                 ]
                }
            },
            { $sample: { size: 8 } } 
        ])
        delete req.session.cart
        res.render('productDetail',{user:req.user,categories,products,variations,route: req.path || '',cartcount : cartCout,relatedProducts,featuredProducts})
    }catch(error){
        console.log(error.message)
    }
}

exports.Search = async(req,res)=>{
    try{
        const { page = 1, limit = 9 } = req.query
        const search = req.query.search
        const Category =  await category.findOne({category_name : { $regex: search, $options: 'i'}})

        let query ={ $or: [
                {product_name : { $regex: search, $options: 'i'}},
                
                {description : { $regex: search, $options: 'i'}},
                {tags : { $regex: search, $options: 'i'}},   
            ]
        }

        if(Category){
          query.$or.push({category_id : Category._id})
        }
 
        const products = await product.paginate(query,{page : parseInt(page), limit : parseInt(limit)})
        let variations = []
        for (let i = 0; i < products.docs.length; i++){
            variations.push(await variation.findOne({ product_id : products.docs[i]._id}))
        } 

        const categories = await category.find() 
        const cartCout = await cart.countDocuments({user_id:req.user._id})  
        const Subcategory = ''
        const subcategoryid = req.query.s || ''
        res.render('category',{user:req.user, categories,Subcategory, products, variations, currentCategoryId : '',search : search, route: req.path || '', cartcount : cartCout,subcategoryid})
    }catch(error){
        console.log(error.message)
    }
}

exports.Buynow = async(req,res) => {


   if(!req.user){
     return res.json({success:false})
   } 

   const {productId,quantity,price,variations} = req.body

   const item = [{product_id : await product.findById(productId), variation : variations}]

   const products = [
     {  
        user_id : req.user._id,
        items : item,
        quantity : quantity,
        total : price,

     }
   ]

   req.session.buynow = products

   return res.json({success:true})
}