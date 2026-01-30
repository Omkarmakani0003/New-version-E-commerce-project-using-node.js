const {product} = require('../models/admin/product')
const {variation} = require('../models/admin/variation')
const {category} = require('../models/admin/category')
const {subcategory} = require('../models/admin/subcategory')
const {cart} = require('../models/cart') 

exports.AllCategory = async(req,res)=>{
    try{
        const categories = await category.find() 
        const { page = 1, limit = 9 } = req.query
        const products = await product.paginate({},{page : parseInt(page), limit : parseInt(limit)})
        let variations = []
        for (let i = 0; i < products.docs.length; i++){
            variations.push(await variation.findOne({ product_id : products.docs[i]._id}))
        }
        const cartCout = await cart.countDocuments({user_id:req.user._id}) 
        const Subcategory = ''
        const subcategoryid = req.query.s || ''
        res.render('category',{user:req.user, categories,Subcategory, products, variations, currentCategoryId : '',route: req.path || '',cartcount : cartCout,subcategoryid})
    }catch(error){
        console.log(error.message)
    }
}

exports.Category = async(req,res)=>{
    try{
        const { page = 1, limit = 9 } = req.query
        const subcategoryid = req.query.s || ''
        const id = req.params.id
        const categories = await category.find() 
        const Subcategory = await subcategory.find({categoryid:id})
        const products = await product.paginate({category_id:id},{page : parseInt(page), limit : parseInt(limit)})
        let variations = []
        for (let i = 0; i < products.docs.length; i++){
            variations.push(await variation.findOne({ product_id : products.docs[i]._id}))
        }
        const cartCout = await cart.countDocuments({user_id:req.user._id}) 
        res.render('category',{user:req.user, categories, Subcategory, products, variations, currentCategoryId : id, route: req.path || '',cartcount : cartCout,subcategoryid})
    }catch(error){
        console.log(error.message)
    }
}

exports.GetCategoryWiseProducts= async(req,res) =>{
      const id = req.query.category.split(',')
      const { page = 1, limit = 9 } = req.query
      if(id.length > 0 && id[0] != ''){

        const products = await product.paginate({
            $or : [ 
                {category_id: { $in: id }}, 
                {subcategory_id: { $in: id }}
            ]
         },{page : parseInt(page), limit : parseInt(limit)})

        return res.status(200).json({'success':true,products})
        
      }else{

        if(req.query.id){
            const products = await product.paginate({category_id: { $in: req.query.id }},{page : parseInt(page), limit : parseInt(limit)})
            return res.status(200).json({'success':true,products})
        }else{
            const products = await product.paginate({},{page : parseInt(page), limit : parseInt(limit)})
            return res.status(200).json({'success':true,products})
        }
        
      } 
}