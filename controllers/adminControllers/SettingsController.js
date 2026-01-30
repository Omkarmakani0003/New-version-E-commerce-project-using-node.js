const {category} = require('../../models/admin/category')
const {subcategory} = require('../../models/admin/subcategory')
const {slider} = require('../../models/slider')
const { validationResult } = require("express-validator");
const cloudinary = require('cloudinary').v2

exports.sliders = async(req,res) => {
    const categories = await category.find()
    const Slider = await slider.find()
    return res.render('admin/sliders/index',{categories,Slider,success:req.flash('success')})
}

exports.create = async(req,res) => {
    const categories = await category.find()
    return res.render('admin/sliders/create',{categories,success:req.flash('success'),error:req.flash('error'),oldInput: req.flash("oldInput")})
}

exports.store = async(req,res) => {
    
    try{
        const errors = await validationResult(req);

        if (!errors.isEmpty()) {
            req.flash("oldInput", req.body);
            errors.array().forEach((e) => {
             req.flash("errors", e);
                  
            });
            return res.redirect("back");
        }
        
        const Slider = await slider.create({
            title : req.body.title,
            category_id : req.body.category_id,
            subcategory_id : req.body.subcategory_id,
            image : {'url':req.file.path,'public_id':req.file.filename },
            description : req.body.description
        })

        req.flash("success", "New slider added successfully"); 
        return res.redirect('/admin/slider-list');

    }catch (error){
        console.log(error.message)
    }

}

exports.Edit = async (req, res) => {
  const Slider = await slider.findById(req.params.id);
  const categories = await category.find()
  const Subcategory = await subcategory.find({ categoryid : Slider.category_id})
  return res.render("admin/sliders/update", {
    error: req.flash("errors"),
    success: req.flash("success"),
    oldInput: req.flash("oldInput"),
    Slider,
    categories,
    Subcategory
  });
};

exports.Update = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((e) => {
      req.flash("errors", e);
    });
    return res.redirect(`/admin/slider-edit/${req.params.id}`);
  }

  const Slider = await slider.findById(req.params.id)

  let image = '';
  if(Slider.image.length > 0){
      image = {'public_id' : String(Slider.image[0].public_id), 'url' : String(Slider.image[0].url)}
  }

  if(req.file != undefined){
    if(Slider.image.length > 0){
     await cloudinary.uploader.destroy(Slider.image[0].public_id)
    }
     image = {'public_id' : String(req.file.filename), 'url' : String(req.file.path)}
  }

  await slider.findByIdAndUpdate(
    req.params.id,
    {
        title : req.body.title,
        category_id : req.body.category_id,
        subcategory_id : req.body.subcategory_id,
        image : image,
        description : req.body.description
    },
    { new: true }
  );

  req.flash("success", "Slider update successfully");
  return res.redirect(`/admin/slider-list`);
};


exports.delete = async(req,res) => {
  if (!req.params.id) return;
    try {
      const Slider = await slider.findByIdAndDelete(req.params.id);
      if(Slider){
        await cloudinary.uploader.destroy(Slider.image[0].public_id)
      }
      return res.status(200).json({ success: true, message: "Slider delete successfully" });
    } catch (error) {
      return res.status(401).json({ success: false, message: "Slider delete failed" });
    } 
}

