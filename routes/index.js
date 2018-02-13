var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    middleware = require('../middleware'),
    nodemailer = require('nodemailer');
    
    
// ROOT ROUTE
router.get('/', function(req, res) {
  console.log('Root route called.');
  res.render('home');
});


// CONTACT FORM GET ROUTE
router.get('/contact', function(req, res){
    res.render('content/contact');
});


// CONTACT FORM POST ROUTE
// This route needs to be customized with your email smtp settings.
router.post('/contact', function(req, res){
  var output = '<p>You have a contact request from ***name of blog**</p><h3>Contact Details</h3><ul> <li>Name: ' + req.body.contact.name + '<li> <li>Email: ' + req.body.contact.email +'</li> <li>Phone: ' +  req.body.contact.phone + '</li></ul><h3>Subject: ' + req.body.contact.subject + '</h3><p>' + req.body.contact.message + '</p>';

    //NODEMAILER CODE
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: 'smtp.company.email', //User your email hosts smtp settings
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'example@email.com', // Your login username
            pass: 'password'  // Your password
        }        , 
        tls: {
            rejectUnauthorized:true
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"NodeBlog Contact Form" <example@email.com>', // sender address
        to: 'receiver1@email.com, receiver2@email.com', // list of receivers
        subject: 'A message from NodeBlog Contact Form', // Subject line
        text: 'A message from NodeBlog Contact Form', // plain text body
        html: output // html body - set to var output from above
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            req.flash("error", "Something went wrong. Please try again.")
            return res.redirect('back') 
        } 
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        req.flash("success", "Your message was successfully sent. We'll get back to you as soon as we can.")
        res.render('contact'); //Add flash message

    });
})


// ABOUT SHOW PAGE
router.get('/about', function(req, res) {
    res.render("content/about");
})

// CONTRIBUTE SHOW PAGE
router.get('/contribute', function(req, res){
    res.render('content/contribute');
})

// RESOURCES SHow PAGE
router.get('/resources', function(req, res){
    res.render('content/resources')
})
//========================================
module.exports = router;