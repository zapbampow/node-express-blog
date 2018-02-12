var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog'),
    User = require('../models/user'),
    middleware = require('../middleware');
    

// Tags ROUTES
router.get ('/:thisTag', function(req, res) {
    var page = 1;
    
    Blog.paginate({"tags":req.params.thisTag}, {sort: { date: -1 }, page:page, limit:8}, function(err, blog) {
        var thisTag = req.params.thisTag;
        if(err){
            console.log(err);
            req.flash('error', "Hmm. There was a problem either finding that tag or finding any articles under that tag.")
        } else {
            console.log(blog)
            res.render('content/category/tags', {blog:blog, current:page, thisTag:thisTag})
        }
    })
});

//Methods Category for later pagination
router.get('/:thisTag/:page_num', function(req,res){
    var page = req.params.page_num;
    
     Blog.paginate({"tags":req.params.thisTag}, {sort: { date: -1 }, page:page, limit:8}, function(err, blog) {
        var thisTag = req.params.thisTag;
        if(err){
            console.log(err);
            req.flash('error', "Hmm. There was a problem either finding that tag or finding any articles under that tag.")
        } else {
            console.log(blog)
            res.render('content/category/tags', {blog:blog, current:Number(blog.page), thisTag:thisTag})
        }
    })
})


//===================

module.exports = router;