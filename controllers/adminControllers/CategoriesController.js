const { category } = require("../../models/admin/category");
const { subcategory } = require("../../models/admin/subcategory");
const { validationResult } = require("express-validator");
const cloudinary = require('cloudinary').v2

// Main category
exports.CategoryCreate = (req, res) => {
  res.render("admin/categories/create", {
    error: req.flash("errors"),
    success: req.flash("success"),
  });
};

exports.CategoryStore = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      errors.array().forEach((e) => {
        req.flash("errors", e);
      });
      return res.redirect("/admin/category-create");
    }

    const { category_name, status } = req.body;
    const categories = await category.create({
      category_name: category_name,
      image: {'public_id' : String(req.file.filename), 'url' : String(req.file.path)},
      status: status,
    });

    req.flash("success", "New category create");
    return res.redirect("/admin/categories");
  } catch (error) {
    console.log(error.message)
    req.flash("errors", error);
    return res.redirect("/admin/category-create");
  }
};

exports.CategoryList = async (req, res) => {
  const categories = await category.find();
  return res.render("admin/categories/index", { error: req.flash("errors"),
    success: req.flash("success"),categories });
};

exports.CategoryEdit = async (req, res) => {
  const categories = await category.findById(req.params.id);
  return res.render("admin/categories/update", {
    error: req.flash("errors"),
    success: req.flash("success"),
    categories,
  });
};

exports.CategoryUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((e) => {
      req.flash("errors", e);
    });
    return res.redirect(`/admin/category-edit/${req.params.id}`);
  }

  const { category_name, status } = req.body;
  const Category = await category.findById(req.params.id)
  let image = '';
  if(Category.image.length > 0){
      image = {'public_id' : String(Category.image[0].public_id), 'url' : String(Category.image[0].url)}
  }

  if(req.file != undefined){
    if(Category.image.length > 0){
     await cloudinary.uploader.destroy(Category.image[0].public_id)
    }
     image = {'public_id' : String(req.file.filename), 'url' : String(req.file.path)}
  }

  await category.findByIdAndUpdate(
    req.params.id,
    {
      category_name,
      status,
      image
    },
    { new: true }
  );

  req.flash("success", "Category update successfully");
  return res.redirect(`/admin/categories`);
};

exports.CategoryDelete = async (req, res) => {
  if (!req.params.id) return;
  try {

    const Category = await category.findByIdAndDelete(req.params.id);
    
    if(Category.image && Category.image.length > 0){
      await cloudinary.uploader.destroy(Category.image[0].public_id)
    }
    
    return res
      .status(200)
      .json({ success: true, message: "Category delete successfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Category delete faild" });
  }
};

// Sub category

exports.SubCategoryCreate = async (req, res) => {
  const categories = await category.find();
  res.render("admin/sub-categories/create", {
    error: req.flash("errors"),
    success: req.flash("success"),
    categories,
  });
};

exports.SubCategoryStore = async (req, res) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    errors.array().forEach((e) => {
      req.flash("errors", e);
    });
    return res.redirect("/admin/subcategories-create");
  }

  const { subcategory_name, categoryid, status } = req.body;

  const subcategories = await subcategory.create({
    subcategory_name: subcategory_name,
    categoryid: categoryid,
    status: status,
  });

  req.flash("success", "New subcategory create");
  return res.redirect("/admin/subcategories");
};

exports.SubCategoryList = async (req, res) => {
  const subcategories = await subcategory.find().populate("categoryid", "category_name");
    return res.render("admin/sub-categories/index", { 
    error: req.flash("errors"),
    success: req.flash("success"),
    subcategories });
};

exports.SubCategoryEdit = async (req, res) => {
  const subcategories = await subcategory.findById(req.params.id);
  const categories = await category.find();
  return res.render("admin/sub-categories/update", {
    error: req.flash("errors"),
    success: req.flash("success"),
    subcategories,
    categories,
  });
};

exports.SubCategoryUpdate = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    errors.array().forEach((e) => {
      req.flash("errors", e);
    });
    return res.redirect(`/admin/subcategories-edit/${req.params.id}`);
  }

  const { subcategory_name, categoryid, status } = req.body;

  const subcategories = await subcategory.findByIdAndUpdate(
    req.params.id,
    {
      subcategory_name: subcategory_name,
      categoryid: categoryid,
      status: status,
    },
    { new: true }
  );

  req.flash("success", "Subcategory update successfully");
  return res.redirect(`/admin/subcategories`);
};

exports.SubCategoryDelete = async (req, res) => {
  if (!req.params.id) return;
  try {
    await subcategory.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ success: true, message: "SubCategory delete successfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Category delete faild" });
  }
};
