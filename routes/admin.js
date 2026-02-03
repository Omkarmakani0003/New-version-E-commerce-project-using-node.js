const express = require('express');
const router = express.Router();
const {loginform, login, dashboard,logout} = require("../controllers/adminControllers/DashboardController")
const  ProductController  = require("../controllers/adminControllers/ProductController")
const UserController = require("../controllers/adminControllers/UserController")
const upload = require("../middleware/FileUploader")

const{ CategoryValidator, SubCategoryValidator } = require('../middleware/validators/categoryValidators')
const{ ProductValidator } = require('../middleware/validators/ProductValidation')
const { SliderValidation } = require('../middleware/validators/SliderValidation')

const CategoryController = require("../controllers/adminControllers/CategoriesController")
const SliderController = require('../controllers/adminControllers/SettingsController')
const OrderController = require('../controllers/adminControllers/OrderController')
const PaymentController = require("../controllers/adminControllers/PaymentController")
const {CheckAdminAuth} = require('../middleware/authentication')


// check admin is already logged in or not
const Isloggein = (req,res,next) =>{
    if(req.cookies.admin_token){
        return res.redirect('/admin/')
    }
    next()
}
//Admin auth route
router.get('/login',Isloggein,loginform)
router.post('/login',Isloggein,login)


// Dashboard routes
router.use(CheckAdminAuth)
router.get('/',dashboard)

//Product routes
router.get('/product-create',ProductController.ProductCreate)
router.get('/displaysubcetegory/:id',ProductController.DisplaySubCategory)
router.post('/prouct-store',upload.array('images[]',5),ProductValidator,ProductController.ProuctAdd)
router.get('/products',ProductController.ProductList)
router.get('/product-detail/:slug',ProductController.ProductView)
router.delete('/product-delete/:id',ProductController.DeleteProduct)
router.get('/product-edit/:slug',ProductController.EditProduct)
router.delete('/productimage-delete/:public_id/:id',ProductController.DeleteImage)
router.post('/prouct-update/:slug',upload.array('images[]',5),ProductValidator,ProductController.ProuctUpdate)

//Categories routes
router.get('/category-create',CategoryController.CategoryCreate)
router.post('/category-store',upload.single('image'),CategoryValidator,CategoryController.CategoryStore)
router.get('/categories',CategoryController.CategoryList)
router.get('/category-edit/:id',CategoryController.CategoryEdit)
router.post('/category-update/:id',upload.single('image'),CategoryValidator,CategoryController.CategoryUpdate)
router.delete('/category-delete/:id',CategoryValidator,CategoryController.CategoryDelete)

//Subcategories routes
router.get('/subcategories-create',CategoryController.SubCategoryCreate)
router.post('/subcategories-store',SubCategoryValidator,CategoryController.SubCategoryStore)
router.get('/subcategories',CategoryController.SubCategoryList)
router.get('/subcategories-edit/:id',CategoryController.SubCategoryEdit)
router.post('/subcategories-update/:id',SubCategoryValidator,CategoryController.SubCategoryUpdate)
router.delete('/subcategories-delete/:id',CategoryController.SubCategoryDelete)

router.get('/slider-list',SliderController.sliders)
router.get('/slider-create',SliderController.create)
router.post('/slider-store',upload.single('image'),SliderValidation,SliderController.store)
router.get('/slider-edit/:id',SliderController.Edit)
router.post('/slider-update/:id',upload.single('image'),SliderController.Update)
router.delete('/slider-delete/:id',SliderController.delete)

router.get('/orders',OrderController.orders)
router.get('/view-order/:id',OrderController.vieworder)
router.post('/update-status',OrderController.updateStatus)

router.get('/users',UserController.users)

router.get('/payment',PaymentController.payment)

router.get('/logout',logout)

module.exports = router;
