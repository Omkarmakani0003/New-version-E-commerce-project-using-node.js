const {category} = require('../../models/admin/category')
const {subcategory} = require('../../models/admin/subcategory')
const multer = require('multer');
const slugify = require('slugify')
const { validationResult } = require("express-validator");
const {product} = require('../../models/admin/product')
const {variation} = require('../../models/admin/variation')
         
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

exports.ProductCreate = async(req,res) => {
     try{
        const categories = await category.find()
         
        res.render('admin/product/create',{categories, error: req.flash("errors"), oldInput: req.flash("oldInput")}); 
     }catch(error){
         console.error(error)
     }  
}

exports.DisplaySubCategory = async(req,res) => {
     try{
          const id = req.params.id
          if(!id){
          return false;
          }
          const subcategories = await subcategory.find({categoryid:id})
          if(!subcategories){
          res.status(200).json({success:false,data:'Data not found'})  
          }
          res.status(200).json({success:true,data:subcategories})
     }catch(error){
          res.status(500).json({success:false,data:'Bad request'})  
     }  
} 

exports.ProuctAdd = async(req,res) => {
    
     try{

        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
           req.flash("oldInput", req.body);
           errors.array().forEach((e) => {
           req.flash("errors", e);
           
        });
         return res.redirect("/admin/product-create");
        }

        const slug = await slugify(req.body.product_name,{
           lower: true,
           trim: true,
           strict : true
        })

        const url = req.files.map((e)=>{ return e.path })
        const public_id = req.files.map((e)=>{ return e.filename })

        const products = await product.create({
            product_name: req.body.product_name,
            slug: slug,
            category_id: req.body.category_id,
            subcategory_id: req.body.subcategory_id,
            price : req.body.price,
            discount: req.body.discount,
            stock: req.body.stock,
            shipping_price: req.body.shipping_price,
            brand_name :req.body.brand_name,
            sku :req.body.sku,
            condition: req.body.condition,
            tags: req.body.tags,
            status: req.body.status,
            images: {'url':url,'public_id':public_id},
            description: req.body.description
        })


        if(req.body.variation_type && req.body.variations){

         const variationsMap = req.body.variation_type.reduce((obj, type, index) => {

            if (!obj[type]) {
                  obj[type] = [];
            }

            if (typeof req.body.variations[index] === 'string' &&
                  req.body.variations[index].includes(',')) {

                  obj[type].push(
                     ...req.body.variations[index]
                        .split(',')
                        .map(v => v.trim())
                  );

            } else {
                  obj[type].push(req.body.variations[index]);
            }

            return obj;
         }, {});

         const variations = Object.entries(variationsMap).map(
            ([type, values]) => ({
                  type,
                  values
            })
         );

            await variation.create({
               variation: variations,
               product_id : products._id,
               status:req.body.status
           })
         }
        
        req.flash("success", "New product added successfully"); 
        res.redirect('/admin/products')
      
     }catch(error){
        console.log(error.message)
     }
}

exports.ProductList = async(req,res) => {
   try{
      const products = await product.find();
      const categories = await category.find();
      res.render('admin/product/index',{products,categories, error: req.flash("errors"), success: req.flash("success")})
   }catch(error){
       console.log(error.message)
   }  
}

exports.ProductView = async(req,res) => {

   try{
      const slug = req.params.slug;
      const products = await product.findOne({slug});
      let subcategories = '';
      const categories = await category.findById(products.category_id);
      if(products.subcategory_id){
         subcategories = await subcategory.findById(products.subcategory_id);
      }
      const variations = await variation.findOne({product_id :products._id})
      res.render('admin/product/view',{products, categories, subcategories,variations, error: req.flash("errors"), success: req.flash("success")})
   }catch(error){
      console.log(error.message)
   }
      
}

exports.DeleteProduct = async(req,res) => {
   try{
      const id = req.params.id
      const products = await product.findByIdAndDelete(id)
      if(products){
         products.images[0].public_id.forEach(async(p_id)=>{
             await cloudinary.uploader.destroy(p_id)
         })
         await variation.findOneAndDelete({product_id:id})
      }
      return res.status(200).json({success:true})
   }catch(error){
      console.log(error.message)
   }
}

exports.EditProduct = async(req,res)=>{
    try{
      const slug = req.params.slug;
      const products = await product.findOne({slug});
      let subcategories = '';
      const categories = await category.find();
      if(products.subcategory_id){
         subcategories = await subcategory.findById(products.subcategory_id);
      }
      const variations = await variation.findOne({product_id :products._id})
      res.render('admin/product/update',{products, categories, subcategories,variations, error: req.flash("errors"), success: req.flash("success"),oldInput: req.flash("oldInput")})
   }catch(error){
      console.log(error.message)
   }
} 

exports.DeleteImage = async(req,res)=>{
   try{
      const id = req.params.id
      const public_id = 'Product_images/'+req.params.public_id
      const products = await product.findById(id);
      let indexOfImage = ''

      products.images.forEach((e)=>{
         indexOfImage = e.public_id.indexOf(public_id)
         e.public_id.splice(indexOfImage,1)
         e.url.splice(indexOfImage,1)
      })
      const image = await products.save()
       
      if(image){
         await cloudinary.uploader.destroy(public_id)
      }

      res.json({message:'Image remove successfully'})

   }catch(error){
      console.log(error.message)
   }
 
}

exports.ProuctUpdate = async(req,res)=>{
   const slug = req.params.slug

   try{
      
        const errors = await validationResult(req);
        if (!errors.isEmpty()) {
           req.flash("oldInput", req.body);
           errors.array().forEach((e) => {
           req.flash("errors", e);
           
        });
         return res.redirect(`/admin/product-upload/${slug}`);
        }

        const products = await product.findOne({slug});

        const url = products.images[0].url;
        const public_id = products.images[0].public_id;

          if(req.files.length > 0) {
              req.files.map((e)=>{  url.push(e.path) }),
              req.files.map((e)=>{ public_id.push(e.filename) })
          }

            products.product_name = req.body.product_name,
            products.category_id = req.body.category_id,
            products.subcategory_id = req.body.subcategory_id,
            products.price  = req.body.price,
            products.discount = req.body.discount,
            products.stock = req.body.stock,
            products.shipping_price = req.body.shipping_price,
            products.brand_name  =req.body.brand_name,
            products.sku  =req.body.sku,
            products.condition = req.body.condition,
            products.tags = req.body.tags,
            products.status = req.body.status,
            products.images = {'url':url,'public_id':public_id}
            products.description = req.body.description,

           await products.save()


        if(req.body.variation_type && req.body.variations){

          const variationsMap = req.body.variation_type.reduce((obj, type, index) => {

            if (!obj[type]) {
                  obj[type] = [];
            }

            if (typeof req.body.variations[index] === 'string' &&
                  req.body.variations[index].includes(',')) {

                  obj[type].push(
                     ...req.body.variations[index]
                        .split(',')
                        .map(v => v.trim())
                  );

            } else {
                  obj[type].push(req.body.variations[index]);
            }

            return obj;
         }, {});

         const variations = Object.entries(variationsMap).map(
            ([type, values]) => ({
                  type,
                  values
            })
         );

      let variationDoc = await variation.findOne({ product_id: products._id });

      if (variationDoc) {
      
      variationDoc.variation = variations;
      variationDoc.status = req.body.status;
      await variationDoc.save();

      }else{
      
      variationDoc = new variation({
         product_id: products._id,
         variation: variations,
         status: req.body.status
      });
      await variationDoc.save();
      }
   }
        
     req.flash("success", "Product updated successfully"); 
     res.redirect('/admin/products')
      
     }catch(error){
        console.log(error.message)
     }

}





