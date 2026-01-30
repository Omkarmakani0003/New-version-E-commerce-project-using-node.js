const multer = require('multer');
const path = require('path')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const dotenv = require('dotenv')
dotenv.config()

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key :  process.env.CLOUDINARY_API,
    api_secret : process.env.CLOUDINARY_SECRET_KEY
})

const storage = new CloudinaryStorage({
    cloudinary : cloudinary,
    params : {
        folder : "EShop",
        allowed_formats : ["jpg","jpeg","png"]
    }
})

const upload = multer({ storage })
module.exports = upload;