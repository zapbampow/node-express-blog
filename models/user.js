var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');

//
// User SCHEMA
//
var userSchema = new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    permission: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);