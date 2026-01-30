const createError = require('http-errors');
const express = require('express');
const { connection } = require('./config/connection')
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const flash = require('connect-flash')
const dotenv = require('dotenv');
dotenv.config()
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');

const app = express();
connection();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
   secret:'thisissecret',
   resave: false,
   saveUninitialized: true,
}))
app.use(flash())
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin/', adminRouter);
app.use('/', userRouter);



app.listen(process.env.PORT,()=>{
  console.log('server is running on port',process.env.PORT)
})


