//
// SETUP
//
var express =           require('express'),
    app =               express(),
    bodyParser =        require('body-parser'),
    ejs =               require('ejs'),
    expressSanitizer =  require ('express-sanitizer'),
    expressSession =    require('express-session'),
    flash =             require('connect-flash'),
    methodOverride =    require('method-override'),
    moment =            require('moment'),
    mongoose =          require('mongoose'),
    mongoosePaginate =  require('mongoose-paginate'),
    nodemailer =        require('nodemailer'),
    passport =          require('passport'),
    LocalStrategy =     require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.use(methodOverride("_method"));;
app.use(expressSanitizer());
app.use(flash());


// Connect Mongoose
var url = process.env.DATABASEURL || "mongodb://localhost/nodeblog";
mongoose.connect(url);
mongoose.Promise = global.Promise;

// Models
var Blog = require('./models/blog'), 
    Comment = require('./models/comment'),
    User = require('./models/user');



// Routes
var blogRoutes = require('./routes/blogs'),
    commentRoutes = require('./routes/comments'),
    adminRoutes = require('./routes/admin'),
    searchRoute = require('./routes/search'),
    categoryRoutes = require('./routes/category'), 
    tagsRoutes = require('./routes/tags'),
    indexRoutes = require('./routes/index');

// Passport Setup
app.use(require('express-session')({
    secret:"Ecryption sentence to encode/decode session.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Pass User to all routes
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
})


app.use('/', indexRoutes);
app.use("/content", blogRoutes);
app.use('/content/:id/comments', commentRoutes);
app.use('/admin', adminRoutes);
app.use('/search', searchRoute);
app.use('/content/category', categoryRoutes);
app.use('/content/tags', tagsRoutes);


// 404 Handling
app.use(function (req, res, next) {
  res.status(404).render("nothing-here");
})


//
// LISTENING
//
app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Node Blog App started and listening.');
});
