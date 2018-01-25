var mongoose = require('mongoose');

//
// BLOG CHEMA
//
var blogSchema = new mongoose.Schema({
  title: String,
  date: {type: Date, default: Date.now},
  author: String,
  content: String,
  image: String, 
});

module.exports = mongoose.model('Blog', blogSchema);

