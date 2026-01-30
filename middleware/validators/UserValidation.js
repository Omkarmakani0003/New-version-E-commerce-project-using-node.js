const { body } = require("express-validator");

exports.UserValidation = [
    body('fullName').notEmpty().trim().withMessage('Full name is required'),
    body('email').notEmpty().trim().withMessage('email is required'),
    body('contact').notEmpty().trim().withMessage('contact is required'),
    body('city').notEmpty().trim().withMessage('city is required'),
    body('state').notEmpty().trim().withMessage('state is required'),
    body('address').notEmpty().trim().withMessage('address is required'),
    body('password').notEmpty().trim().withMessage('password is required'),
    body('confirm_password').notEmpty().trim().withMessage('confirm_password is required'),
    body('agreement').notEmpty().withMessage('You are not agree'),

    body('confirm_password')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
]

exports.UserUpdateValidation = [
    body('fullName').notEmpty().trim().withMessage('Full name is required'),
    body('contact').notEmpty().trim().withMessage('contact is required'),
    body('city').notEmpty().trim().withMessage('city is required'),
    body('state').notEmpty().trim().withMessage('state is required'),
    body('address').notEmpty().trim().withMessage('address is required'),
]

