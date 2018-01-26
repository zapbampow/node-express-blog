var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

//
// Comment SCHEMA
//
var commentSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
    date: {type: Date, default: Date.now},
});

// commentSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Comment', commentSchema);

