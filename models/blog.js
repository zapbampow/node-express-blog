var mongoose = require('mongoose'),
    mongoosePaginate = require('mongoose-paginate');

//
// BLOG SCHEMA
//
var blogSchema = new mongoose.Schema({
title: String,
date: {type: Date, default: Date.now},
author: {
    id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
    },
    name: String
},
content: String,
image: String, 
category: String,
tags: [String],
comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});

blogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Blog', blogSchema);

