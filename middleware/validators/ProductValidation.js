const { body } = require("express-validator");

exports.ProductValidator = [
    body('product_name').notEmpty().trim().withMessage('Product name is required'),
    body('category_id').notEmpty().withMessage('Please select category'),
    body('price').notEmpty().trim().withMessage('Price is required'),
    body('discount').notEmpty().trim().withMessage('discount is required'),
    body('stock').notEmpty().trim().withMessage('stock is required'),
    body('shipping_price').notEmpty().trim().withMessage('shipping price is required'),
    body('brand_name').notEmpty().trim().withMessage('Brand name is required'),
    body('sku').notEmpty().trim().withMessage('SKU is required'),
    body('status').notEmpty().withMessage('Select status'),
    body('description').notEmpty().withMessage('Description is required'),
    
]