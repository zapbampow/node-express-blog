//
// SETUP
//
var express =         require('express'),
    app =             express(),
    bodyParser =      require('body-parser'),
    ejs =             require('ejs'),
    expressSanitizer = require ('express-sanitizer'),
    expressSession = require('express-session'),
    methodOverride =  require('method-override'),
    moment = require('moment'),
    mongoose        = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.use(methodOverride("_method"));;
app.use(expressSanitizer());

// Connect Mongoose
mongoose.connect('mongodb://localhost/frugalbrewing');
mongoose.Promise = global.Promise;

// Models
var Blog = require('./models/blog'), 
    Comment = require('./models/comment'),
    User = require('./models/user');

// Routes
var blogRoutes = require('./routes/blogs'),
    commentRoutes = require('./routes/comments'),
    adminRoutes = require('./routes/admin');

// Passport Setup
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/content", blogRoutes);
app.use('/content/:id/comments', commentRoutes);
app.use('/admin', adminRoutes);

//
// ROUTES
//

// ROOT ROUTE
app.get('/', function(req, res) {
  console.log('Root route called.');
  res.render('home');
});



//
// LISTENING
//
app.listen(process.env.PORT, process.env.IP, function() {
  console.log('Frugal Brewing App started and listening.');
});
