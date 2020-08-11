var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var mongoose = require('mongoose')
var connectMongo = require("connect-mongo");
var expressSession = require("express-session");
const flash = require('express-flash');
const fileUpload = require("express-fileupload");
const hbs = require('express-handlebars');
const hbshelpers = require('handlebars-helpers');
const multihelpers = hbshelpers();

const indexController = require('./controllers/general/index');
const productListController = require("./controllers/product/productList");
const registerUserController = require("./controllers/general/registerUser");
const storeUserController = require("./controllers/general/storeUser");
const dashboardController = require("./controllers/general/dashboard");
const loginController = require("./controllers/general/login");
const loginUserController = require("./controllers/general/loginUser");
const logoutController = require("./controllers/general/logout");
const clerkDashboardController = require("./controllers/general/clerkDashboard");
const addMealPackageController = require("./controllers/product/addMealPackage");
const storeMealPackageController = require("./controllers/product/storeMealPackage");
const editMealPackageController = require("./controllers/product/editMealPackage");
const updateMealPackageController = require("./controllers/product/updateMealPackage");
const deleteMealPackageController = require("./controllers/product/deleteMealPackage");
const viewProductController = require("./controllers/product/viewProduct");
const addToCartController = require("./controllers/product/addToCart");
const myCartController = require("./controllers/product/myCart");
const clearCartController = require("./controllers/product/clearCart");
const checkoutController = require("./controllers/product/checkout");

var app = express();

//Express Sessions
const mongoStore = connectMongo(expressSession);
app.use(
  expressSession({
    secret: "secret",
    store: new mongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

//connect to mongodb
mongoose
  .connect("mongodb+srv://admin:Seneca@1@southindiancuisine.jpupt.mongodb.net/southindiancuisine?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB..."))
  .catch(err => console.error("Could not connect to MongoDB..."));

//View Engine Setup(HandleBars)
app.engine(
  "hbs",
  hbs({
    helpers: multihelpers,
    // partialsDir: ["views/partials"],
    extname: ".hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "main"
  })
);
app.set('view engine', 'hbs');

app.use(fileUpload());
app.use(flash());
// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("Public"))

//middleware
const auth = require("./middleware/auth");
const redirectIfAuthenticated = require("./middleware/redirectIfAuthenticated");

//home page
app.get('/', indexController);
//list of products
app.get('/product/list', productListController);
//user registration page
app.get("/register/user", redirectIfAuthenticated, registerUserController);
//store user in database
app.post("/store/user", redirectIfAuthenticated, storeUserController);
//dashboard page
app.get("/dashboard", auth, dashboardController);
//login page
app.get("/login", redirectIfAuthenticated, loginController);
//login user into system
app.post("/login/user", redirectIfAuthenticated, loginUserController);
//logout User
app.get("/logout", auth, logoutController);
//clerk dashboard
app.get("/clerk/dashboard", auth, clerkDashboardController);
//add meal package
app.get("/add/meal/package", auth, addMealPackageController);
//store meal package
app.post("/store/meal/package", auth, storeMealPackageController);
//edit meal package
app.get("/edit/meal/package/:id", auth, editMealPackageController);
//update meal package
app.post("/update/meal/package/:id", auth, updateMealPackageController);
//delete meal package
app.get("/delete/meal/package/:id", auth, deleteMealPackageController);
//view product
app.get("/view/product/:id", auth, viewProductController);
//Add to cart
app.post("/addtocart/:id", auth, addToCartController);
//cart
app.get("/mycart", auth, myCartController);
//clear cart
app.get("/clear/cart", auth, clearCartController);
//checkout
app.get("/checkout", auth, checkoutController);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
