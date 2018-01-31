var express = require('express'),
    router = express.Router({mergeParams: true}),
    Comment = require('../models/comment'),
    Blog = require('../models/blog'),
    middleware = require('../middleware');
    

// CREATE COMMENT ROUTE
router.post('/', function(req, res){
    Blog.findById(req.params.id, function (err, blog){
        if(err){
            console.log(err)
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    blog.comments.push(comment._id);
                    blog.save();
                    res.redirect("/content/" + req.params.id)
                }
            })
        }
    })
})





//===================

module.exports = router;