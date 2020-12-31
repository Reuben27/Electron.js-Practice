console.log("Index.js file is up and running my buoi!");

const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'sherlockholmesbaker480@gmail.com',
    pass: 'sher1234'
    }
});

const submitted = document.getElementById('submitbtn');
var email = '';
var subject = '';
var body = '';

submitted.addEventListener('click', function(){
    email  = document.getElementById("email").value;
    subject  = document.getElementById("sub").value;
    body  = document.getElementById("bod").value;
    console.log(typeof(email));
    console.log("Function running!");

    sendemails(email, subject, body);

});

console.log("Yeah Yeah");

function sendemails(email, subject, body){
    var mailOptions = {
        from: "sherlockholmesbaker480@gmail.com",
        to: email,
        subject: subject,
        text: body
    };
    
    console.log("Hemlo");
    console.log(mailOptions);

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
        console.log(error);
        } else {
        console.log('Email sent: ' + info.response);
        }
    });
}