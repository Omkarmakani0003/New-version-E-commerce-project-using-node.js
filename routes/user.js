const express = require('express');
const router = express.Router();
const homeController  = require("../controllers/homeController")
const ProductController = require("../controllers/ProductController")
const CategoryController = require("../controllers/CategoryController")
const RegisterController = require("../controllers/RegisterController")
const LoginController = require("../controllers/LoginController")
const CartController = require('../controllers/CartController')
const CheckOutController = require('../controllers/CheckOutController')
const UserController = require('../controllers/UserController')
const OrderController = require('../controllers/OrderController')
const {UserValidation,UserUpdateValidation} = require("../middleware/validators/UserValidation")
const {CheckUserAuth} = require('../middleware/authentication')
const {UserAttech} = require('../middleware/UserAttech') 


const Isloggein = (req,res,next) =>{
    if(req.cookies.user_token){
        return res.redirect('/')
    }
    next()
}
router.get('/login',Isloggein,LoginController.LoginForm)
router.post('/user-login',Isloggein,LoginController.login)

router.use(UserAttech)
router.get('/user-register',RegisterController.RegisterForm)
router.post('/register',UserValidation,RegisterController.Register)
router.get('/otp',RegisterController.OtpVarify)
router.get('/resendotp/:email',RegisterController.resendOtp)
router.post('/verify/:email',RegisterController.Varify)
router.get('/category/:id',CategoryController.Category)
router.get('/category',CategoryController.AllCategory)
router.get('/get-category-wise-products',CategoryController.GetCategoryWiseProducts)
router.get('/search',ProductController.Search)
router.get('/',homeController.HomePage)
router.get('/product-detail/:slug',ProductController.ProductDetail)
router.post('/add-to-cart',CartController.AddToCart)
router.post('/buynow',ProductController.Buynow)
router.get('/email-verification',UserController.emailVerification)
router.post('/email-varify',UserController.emailverify)
router.get('/password-reset',UserController.passwordReset)
router.post('/reset/:email',UserController.reset)

router.use(CheckUserAuth)
router.get('/logout',LoginController.logout)
router.get('/cart',CartController.DisplayCart)
router.post('/cart-quantity',CartController.CartUpdate)
router.delete('/cart-remove/:id',CartController.CartRemove)
router.get('/checkout',CheckOutController.CheckOut)
router.get('/profile',UserController.profile)
router.post('/update-profile',UserUpdateValidation,UserController.UserUpdate)
router.post('/place-order',CheckOutController.placeOrder)
router.post('/verify-payment',CheckOutController.PaymentVarify)
router.get('/orders',OrderController.Orders)
router.get('/success',OrderController.OrderSuccess)
router.get('/view_order/:id',OrderController.ViewOrders)
router.get('/order-track/:id',OrderController.track)






module.exports = router;
