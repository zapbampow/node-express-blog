//
// SETUP
//
var express =         require('express'),
    app =             express(),
    bodyParser =      require('body-parser'),
    ejs =             require('ejs'),
    expressSanitizer = require ('express-sanitizer'),
    methodOverride =  require('method-override'),
    moment = require('moment'),
    mongoose        = require('mongoose');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.locals.moment = require('moment');
app.use(methodOverride("_method"));;
app.use(expressSanitizer());

mongoose.connect('mongodb://localhost/frugalbrewing');
mongoose.Promise = global.Promise;

// Models
var Blog = require('./models/blog')

// Routes
var blogRoutes = require('./routes/blogs');

app.use("/content", blogRoutes)

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
