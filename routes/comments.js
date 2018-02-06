var express = require('express'),
    router = express.Router({mergeParams: true}),
    Comment = require('../models/comment'),
    Blog = require('../models/blog'),
    middleware = require('../middleware');
    

// CREATE COMMENT ROUTE
router.post('/', function(req, res){
    req.body.comment.message = req.sanitize(req.body.comment.message);

    Blog.findById(req.params.id, function (err, blog){
        if(err){
            console.log(err)
            req.flash("error", "Hmm. Something went wrong.")
        } else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                    req.flash("error", "We had a problem posting your comment. Please try again.")
                } else {
                    blog.comments.push(comment._id);
                    blog.save();
                    res.redirect("/content/" + req.params.id)
                }
            })
        }
    })
})

// EDIT COMMENT ROUTE
router.get('/:comment_id/edit', middleware.isAdmin, function(req, res){
    
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            console.log(err);
            req.flash("error", "I'm not sure why, but we lost the article that you are commenting on. Please try again.")
            res.redirect('back')
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err){
                    console.log(err);
                    req.flash("error", "We had a problem finding that comment. Please try again.")
                    res.redirect('back')
                } else {
                    res.render('content/edit-comment', {blog:foundBlog, comment:foundComment});
                }
            })
        }
    })
})

// UPDATE COMMENTS ROUTE
router.put('/:comment_id', middleware.isAdmin, function(req, res){
    req.body.comment.message = req.sanitize(req.body.comment.message);
    
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
        if(err){
            console.log(err);
            req.flash("error", "We had trouble finding that comment. Please try again.")
            res.redirect('back');
        } else {
            res.redirect('/content/' + req.params.id);
        }
    })
})

// COMMENTS DESTROY ROUTE
router.delete('/:comment_id', middleware.isAdmin, function(req, res){
    Comment.findByIdAndRemove(req.params.comment, function(err){
        if(err){
            console.log(err)
        } else {
            res.redirect('/content/' + req.params.id);
        }
    })
})


//===================

module.exports = router;