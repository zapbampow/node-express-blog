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


module.exports = middlewareObj;