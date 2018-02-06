var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog'),
    passport = require('passport'),
    middleware = require('../middleware');
    
    
router.get('/', function(req, res){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');

    Blog.find({$or:[{title:regex}, {author:regex}, {content:regex}]}, function(err, blog){
        if(err){
            console.log(err)
            req.flash("error", "Hmm. There was a problem with that search. Please try again.")
        } else {
            res.render('search', {blog:blog})
        }
    })
})


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;