var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    middleware = require('../middleware'),
    methodOverride =    require('method-override');
    

// ADMIN INDEX ROUTE
router.get('/', middleware.isLoggedIn, function(req, res){
  res.render('admin');
})

// NEW USER ROUTE
// TODO: Add isAdmin middleware instead of isLoggedIn
router.get('/user/new', /*middleware.isAdmin,*/  function(req, res){
  res.render('register')
})

// REGISTER NEW USER CREATE ROUTE
router.post('/user', /*middleware.isAdmin,*/ function(req, res){
  User.register(new User({name:req.body.name, username: req.body.username, email: req.body.email, permission: req.body.permission}), req.body.password, function(err, user){
    if(err) {
      console.log(err);
      req.flash("error", "Something went wrong creating a new user.")
      res.redirect('/admin/user/new')
    } else {
      passport.authenticate('local')(req, res, function(){
          res.redirect("/admin")
      })
    }
  })
})

// USER INDEX PAGE - a list of all users
router.get('/user', middleware.isAdmin, function(req, res){
  User.find({}, function(err, users){
    if(err){
      console.log(err)
      req.flash('error', "Couldn't find users.")
      res.redirect('back')
    } else {
      res.render('users', {users:users})
    }
  });
});

// USER EDIT PAGE
router.get('/user/:user_id/edit', middleware.isAdmin, function(req, res){
  User.findById(req.params.user_id, function(err, user){
    if(err){
      console.log(err)
      req.flash('error', "We didn't find that user. Try again.")
      res.redirect('back')
    } else {
      res.render('edit-user', {user:user});
    }
  })
})

router.put('/user/:user_id', middleware.isAdmin, function(req, res){
  console.log(req.body)
  
  User.findByIdAndUpdate(req.params.user_id, req.body, function(err, user){
    if(err){
      console.log(err)
      req.flash('error', "There was a problem updating this user. Please try again.")
      res.redirect('back');
    } else {
      req.flash('success', "You have updated the user.")
      res.redirect('/admin/user');
    }
  })
})

router.delete('/user/:user_id', function(req, res){
  User.findByIdAndRemove(req.params.user_id, function(err){
    if(err){
      console.log(err)
      req.flash('error', "There was a problem deleting that user");
      res.redirect('back')
    } 
    res.redirect('/admin/user');
  })
})

// TO LOGIN SHOW PAGE
router.get('/user/login', function(req, res){
    res.render('login')
})

// LOGIN POST ROUTE
router.post('/user/login', passport.authenticate('local', {
  failureRedirect:"/admin/user/login"
}), function(req, res){
  req.flash("Success", "Congratulations on logging in.")
  res.redirect('/admin')
})

// LOGOUT ROUTE
router.get('/logout', function(req, res) {
  req.logout();
  req.flash("success", "You are now logged out.")
  res.redirect('/content')
})




// =======================

module.exports = router;
