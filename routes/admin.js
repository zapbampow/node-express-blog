var express = require('express'),
    router = express.Router(),
    User = require('../models/user');
    

// ADMIN INDEX ROUTE
router.get('/', function(req, res){
  res.render('admin');
})

// LOGIN SHOW PAGE
router.get('/login', function(req, res){
    res.render('login')
})


// NEW USER ROUTE
router.get('/user/new', function(req, res){
  res.render('register')
})

// REGISTER NEW USER CREATE ROUTE
router.post('/user', function(req, res){
    console.log('Something is happening')
  User.register(new User({username: req.body.user.password}), req.body.user.password, function(err, user){
    if(err) {
      console.log(err);
      res.redirect('/user/new')
    } else {
      res.redirect("/admin")
    }
  })
})

//======================
module.exports = router;