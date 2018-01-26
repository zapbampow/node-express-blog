var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    middleware = require('../middleware');
    

// ADMIN INDEX ROUTE
router.get('/', middleware.isLoggedIn, function(req, res){
  res.render('admin');
})

// NEW USER ROUTE
router.get('/user/new', middleware.isLoggedIn, function(req, res){
  res.render('register')
})

// REGISTER NEW USER CREATE ROUTE
router.post('/user', middleware.isLoggedIn, function(req, res){
    console.log('Something is happening')
  User.register(new User({name:req.body.name, username: req.body.username, email: req.body.email, permission: req.body.permission}), req.body.password, function(err, user){
    if(err) {
      console.log(err);
      res.redirect('/user/new')
    } else {
      passport.authenticate('local')(req, res, function(){
          res.redirect("/admin")
      })
    }
  })
})

// TO LOGIN SHOW PAGE
router.get('/user/login', function(req, res){
    res.render('login')
})

// LOGIN POST ROUTE
router.post('/user/login', passport.authenticate('local', {
  // successRedirect:"/admin",
  failureRedirect:"/admin/user/login"
}), function(req, res){
  res.redirect('/admin')
})

// LOGOUT ROUTE
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/content')
})

// =======================

module.exports = router;
