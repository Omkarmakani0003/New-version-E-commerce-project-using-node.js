
const { body } = require("express-validator");

exports.SliderValidation = [
    body('title').notEmpty().trim().withMessage('Tital is required'),
    body('category_id').notEmpty().withMessage('Select category is required'),
    body('subcategory_id').notEmpty().withMessage('Select sub category is required'),
    
]