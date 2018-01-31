var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

//
// BLOG SCHEMA
//
var blogSchema = new mongoose.Schema({
title: String,
date: {type: Date, default: Date.now},
author: {
    id:{
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
    name: String
},
content: String,
image: String, 
comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

// blogSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Blog', blogSchema);

