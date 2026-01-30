const { body } = require("express-validator");

exports.CategoryValidator = [
    body('category_name').notEmpty().trim().withMessage('Category is required'),
    body('status').notEmpty().withMessage('status is required'),
]

exports.SubCategoryValidator = [
    body('subcategory_name').notEmpty().trim().withMessage('SubCategory is required'),
    body('categoryid').notEmpty().withMessage('Select category'),
    body('status').notEmpty().withMessage('Select status'),
]