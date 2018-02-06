var Blog = require('../models/blog'),
    Comment = require('../models/comment'),
    User = require('../models/user');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else {
        req.flash("error", "Please log in first.")
        res.redirect('/admin/user/login')
    }
}

middlewareObj.isAdmin = function(req, res, next){
    if(req.isAuthenticated()){
        if(req.user.permission == 'admin'){
            next();
        } else {
            res.flash('error', 'You must log in as a site administrator.')
            res.redirect('/admin/user/login')
        }
    } else {
        req.flash("error", "Please log in first.")
        res.redirect('/admin/user/login')
    }
}

middlewareObj.checkPostOwnership = function(req, res, next) {
    if(req.isAuthenticated()){
        Blog.findById(req.params.id, function(err, foundPost){
        if(err || !foundPost) {
            req.flash("error", "There was a problem. Please try again.");
            res.redirect("back")
        } else {
            if(foundPost.author.id.equals(req.user._id) || req.user.permission == 'admin'){
                next();
            } else {
                req.flash("error", "Sorry. Only the creator of this article can do that.");
                res.redirect("back"); 
            }
        }
    });
    } else {
        req.flash("error", "Please log in first.");
        res.redirect('/admin/user/login')
    }
}


module.exports = middlewareObj;