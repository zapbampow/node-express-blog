var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog');

// ARTICLE ROUTES

// INDEX ARTICLE ROUTE
router.get('/', function(req, res){
  Blog.find({}, function(err, blog){
    if(err){
      console.log(err)
    } else {
        res.render("content/index", {blog:blog})
    }
  })
})


// NEW ARTICLE ROUTE
router.get('/new', function(req, res){
  res.render("content/new");
});

// CREATE ARTICLE ROUTE
router.post('/', function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);
  
  Blog.create(req.body.blog, function(err, blog){
    if(err){
      console.log(err)
    } else {
      
      res.redirect('/content/' + blog.id)
    }
  })
});

// SHOW ARTICLE ROUTE
router.get('/:id', function(req, res){
  Blog.findById(req.params.id, function(err, foundBlog){
    if(err){
      console.log(err)
    } else {
      res.render("content/show", {blog:foundBlog})
    }
  })
})

// EDIT ARTICLE ROUTE
router.get('/:id/edit', function(req, res){
  Blog.findById(req.params.id, function(err, blog){
    if(err) {
      console.log(err)
    } else {
      res.render('content/edit', {blog:blog})
    }
  })
})

// UPDATE ARTICLE ROUTE
router.put('/:id', function(req, res){
  req.body.blog.content = req.sanitize(req.body.blog.content);

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
    if(err){
      console.log(err)
    } else {
      res.redirect("/content/" + req.params.id)
    }
  })
})

// DESTRY ARTICLE ROUTE
router.delete('/:id', function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err)
    } else {
      res.redirect("/")
    }
  })
})

//===================

module.exports = router;