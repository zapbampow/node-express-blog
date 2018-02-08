var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog'),
    User = require('../models/user'),
    middleware = require('../middleware');
    

// Methods Category ROUTES
router.get ('/:thisCategory', function(req, res) {
    var page = 1;
    
    Blog.paginate({"category":req.params.thisCategory}, {sort: { date: -1 }, page:page, limit:10}, function(err, blog) {
        if(err){
            console.log(err);
            req.flash('error', "Hmm. There was a problem either finding that category or finding any articles under that category.")
        } else {
            console.log(blog)
            res.render('content/category/methods', {blog:blog, current:page})
        }
    })
});

//Methods Category for later pagination
router.get('/:thisCategory/:page_num', function(req,res){
    var page = req.params.page_num;
    
     Blog.paginate({"category":req.params.thisCategory}, {sort: { date: -1 }, page:page, limit:10}, function(err, blog) {
        if(err){
            console.log(err);
            req.flash('error', "Hmm. There was a problem either finding that category or finding any articles under that category.")
        } else {
            console.log(blog)
            res.render('content/category/methods', {blog:blog, current:Number(blog.page)})
        }
    })
})


//===================

module.exports = router;