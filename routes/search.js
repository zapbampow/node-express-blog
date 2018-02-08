var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog'),
    passport = require('passport'),
    middleware = require('../middleware');
    
    
router.get('/', function(req, res){
    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
    var baseSearch = "?search=" + req.query.search;
    var page;
    
    if(req.query.page === undefined){
        page = 1;
    } else {
        page = req.query.page;
    }

    Blog.paginate({$or:[{title:regex}, {author:regex}, {content:regex}]}, {sort: { date: -1 }, page:page, limit:10}, function(err, blog){
        if(err){
            console.log(err)
            req.flash("error", "Hmm. There was a problem with that search. Please try again.")
        } else {
            console.log(blog);
            res.render('search', {blog:blog, current:Number(blog.page), baseSearch:baseSearch})
        }
    })
})


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};


module.exports = router;