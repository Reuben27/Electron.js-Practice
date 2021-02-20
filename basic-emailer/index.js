console.log("Index.js file is up and running!");

const nodemailer = require('nodemailer');

const submitted = document.getElementById('submitbtn');
var email = '';
var subject = '';
var body = '';

submitted.addEventListener('click', function(){
    event.preventDefault();
    email  = document.getElementById("email").value;
    subject  = document.getElementById("sub").value;
    body  = document.getElementById("bod").value;
    console.log("Function running!");

    sendemails(email, subject, body);

    setTimeout(function(){
        location.reload();
    }, 5000);
});

function sendemails(email, subject, body){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: '<your email>',
        pass: '<your password>'
        }
    });

    var mailOptions = {
        from: "<your email>",
        to: email,
        subject: subject,
        html: body
    };

    console.log(mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}