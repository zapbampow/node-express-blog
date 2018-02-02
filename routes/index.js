var express = require('express'),
    router = express.Router(),
    User = require('../models/user'),
    passport = require('passport'),
    middleware = require('../middleware'),
    nodemailer = require('nodemailer');
    
    
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
            return res.redirect('back') //Add flash message
        } 
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.render('contact'); //Add flash message

        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    });
})

//========================================
module.exports = router;