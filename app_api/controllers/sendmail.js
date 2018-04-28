var nodemailer = require('nodemailer');

module.exports = function sendMailer(mailoptions) {
     var self = this;

	/*var transporter = nodemailer.createTransport({
	    host: 'smtpout.secureserver.net',
	    port : "465",
	    secure:true,
            tls: {rejectUnauthorized: false},
	    auth: {
		user: 'info@theorexedutech.com',
		pass: 'ayanlovesmozilla'
	    }
	});*/
	var transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
	    user: 'theorexlabs@gmail.com',
	    pass: 'ayanlovesmozilla'
	}
	});
// setup e-mail data with unicode symbols 
	var mailOptions = {
	    from: '"Theorex Labs " <info@theorexedutech.com>', // sender address 
	    to: mailoptions.to, // list of receivers 
	    subject: mailoptions.subject, // Subject line 
	    text: mailoptions.text, // plaintext body 
	    html: mailoptions.html // html body 
	};
	function invokeOperation(){
		transporter.sendMail(mailOptions, function(error, info){
		    if(error){
			return console.log(error);
		    }
		    console.log('Message sent: ' + info.response);
		});
	}
	invokeOperation();

};
