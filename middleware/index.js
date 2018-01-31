var Blog = require('../models/blog'),
    Comment = require('../models/comment'),
    User = require('../models/user');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        res.redirect('/admin/user/login')
    }
}

middlewareObj.isAdmin = function(req, res, next){
    console.log("Current user is " + req.user)
    if(req.isAuthenticated()){
        if(req.user.permission == 'admin'){
            next();
        } else {
            res.redirect('/admin/user/login')
        }
    } else {
        res.redirect('/admin/user/login')
    }
}


module.exports = middlewareObj;