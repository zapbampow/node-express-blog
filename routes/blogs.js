var express = require('express'),
    router = express.Router(),
    Blog = require('../models/blog'),
    User = require('../models/user'),
    middleware = require('../middleware');

// ARTICLE ROUTES

// INDEX ARTICLE ROUTE
router.get('/', function(req, res){
  Blog.find({}, function(err, blog){
    if(err){
      console.log(err)
      req.flash("error", "Sorry. We couldn't find that article.")
      res.redirect('back')
    } else {
        res.render("content/index", {blog:blog})
    }
  })
})

// ALL ARTICLES ROUTE
router.get('/all/:page_num', function(req, res){
  console.log(req.params.page_num);
  Blog.paginate({}, {page:req.params.page_num, limit:5}, function(err, posts){
    if(err){
      req.flash('error', 'Something went wrong finding those articles. Please try again.');
      res.redirect('back');
    } else {
      console.log(posts)
      res.render('content/all', {posts:posts, current:posts.page});
    }
  })
})


// NEW ARTICLE ROUTE
router.get('/new', middleware.isLoggedIn, function(req, res){
  res.render("content/new");
});

// CREATE ARTICLE ROUTE
router.post('/', middleware.isLoggedIn, function(req, res){
  req.body.blog.body = req.sanitize(req.body.blog.body);

  var newPost = {title:req.body.blog.title, author:{id:req.user.id, name:req.user.name}, image: req.body.blog.image, content:req.body.blog.content}
  
  Blog.create(newPost, function(err, blog){
    if(err){
      console.log(err)
      req.flash("error", "Something went wrong creating a new post. <p>" + err + "</p>")
    } else {
      User.findOne({name:req.user.name}, function(err, foundUser){
        if(err){
          console.log(err)
        } else {
          foundUser.posts.push(blog._id);
          foundUser.save(function(err, data){
            if(err){
              console.log(err)
            } else {
              console.log(data)
            }
          })
        }
      })
      req.flash("Success", "Congrats. Your article was created successfully.")
      res.redirect('/content/' + blog.id)
    }
  })
});

// SHOW ARTICLE ROUTE
router.get('/:id', function(req, res){
  Blog.findById(req.params.id).populate('comments').exec(function(err, foundBlog){
    if(err){
      console.log(err)
      req.flash("error", "Sorry. We couldn't find that blog.");
      res.redirect('back')
    } else {
      res.render("content/show", {blog:foundBlog})
    }
  })
})

// EDIT ARTICLE ROUTE
router.get('/:id/edit', middleware.checkPostOwnership, function(req, res){
  console.log("id is" + req.params.id)
  Blog.findById(req.params.id, function(err, blog){
    if(err) {
      console.log(err)
      req.flash("error", "Hmm. Something went wrong. We couldn't find that article. Maybe try again.")
      res.redirect('back')
    } else {
      res.render('content/edit', {blog:blog})
    }
  })
})

// UPDATE ARTICLE ROUTE
router.put('/:id', middleware.checkPostOwnership, function(req, res){
  req.body.blog.content = req.sanitize(req.body.blog.content);

  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, blog){
    if(err){
      console.log(err)
    } else {
      req.flash("success", "This article was updated successfully.")
      res.redirect("/content/" + req.params.id)
    }
  })
})

// DESTROY ARTICLE ROUTE
router.delete('/:id', middleware.isAdmin, function(req, res){
  Blog.findByIdAndRemove(req.params.id, function(err){
    if(err){
      console.log(err)
    } else {
      res.redirect("/")
    }
  })
})


// AUTHOR INDEX ROUTE - Shows POSTS of single author
router.get('/author/:author_name', function(req, res) {
    User.findOne({name:req.params.author_name}, function(err, foundAuthor){
      if(err){
        console.log(err)
        req.flash("error", "Hmm. That name doesn't seem to be one of our authors.")
      } else {
        Blog.find({'author.id':foundAuthor.id}, function(err, blog){
          if(err){
            console.log(err)
          } else {
            console.log(blog);
            res.render('content/author', {author:foundAuthor, postId:foundAuthor.posts, blog:blog});
          }
        })
      }
    })
})

//===================

module.exports = router;