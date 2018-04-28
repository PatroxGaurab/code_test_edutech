var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Mailer = require('./sendmail');
var crypto = require('crypto');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.register = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  var user = new User();

  user.name = req.body.name;
  user.email = req.body.email;

  user.setPassword(req.body.password);

  user.save(function(err) {
    User.findOne({ email : user.email }, function(err, user2){
  	var emailHash = crypto.randomBytes(20).toString('hex').concat(user2._id);
        console.log(emailHash);
	User.findOneAndUpdate({ email : user.email }, { 'emailVerificationHash':emailHash  }, {upsert:true}, function(err, doc){
	   if (err) return res.send(500, { error: err });
	   var sendsubmail = new Mailer({to: user.email, subject: 'Welcome To TheoreX ',text: 'Successfully Registered ', html: '<center><table width="700" background="#FFFFFF" style="text-align:left;" cellpadding="0" cellspacing="0"><tr>	<td height="18" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<td height="2" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><!--GREEN STRIPE--><tr>	<td background="" width="31" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF;" height="113">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<!--WHITE TEXT AREA-->	<td width="131" bgcolor="#FFFFFF" style="border-top:1px solid #FFF; text-align:center;" height="113" valign="middle">	<span style="font-size:30px; font-family:Josefin Sans; color:#00a0e3;">Thank You!</span>	</td>	<!--GREEN TEXT AREA-->	<td background="" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:15px;" height="113">	<span style="color:#FFFFFF; font-size:25px; font-family:Josefin Sans">For being grateful to your talent.</span>	</td></tr><!--DOUBLE BORDERS BOTTOM--><tr>	<td height="3" width="31" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<center>	<td colspan="3">	<!--CONTENT STARTS HERE-->	<br />	<br />	<table cellpadding="0" cellspacing="0">	<tr>	<td width="200"><div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div></td>	<td width="400" style="padding-right:10px; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" valign="top">	<span style="font-family:Josefin Sans; font-size:20px; font-weight:bold;">Hey, Welcome to <span style="color:#00a0e3">TheoreX</span></span>	<br />	<p style="font-family:Josefin Sans; font-size:15px;">You have now made us a stakeholder in your life! You are just a step away from Learn Create & Execute</p><center><a href="http://theorexedutech.com/emailverify/'+ emailHash + '" style="color: #555; background: #00a0e3;color:#fff;text-decoration:none;padding:10px;font-size:20px;">Verify Email</a></center><br /><p style="font-family:Josefin Sans; font-size:15px;">In the meantime, you can <a href="http://theorexedutech.com/">return to our website</a> to continue browsing.</p>   <p style="font-family:Josefin Sans;font-size:12px;font-weight:bold;">Best Regards,<br/>   Team TheoreX   <br/></p>	</table><br /><table cellpadding="0" style="border-top:1px solid #e4e4e4; text-align:center; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" cellspacing="0" width="900"><tr>	<td height="2" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr>	<td style="font-family:Josefin Sans; font-size:12px; font-weight:bold;">	<br />	For more information get back to us at info@theorexedutech.com	</td></tr></table></center> ' });
	 
	});	
    });
    var token;
    token = user.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });


	

};

module.exports.login = function(req, res) {

  // if(!req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }

  passport.authenticate('local', function(err, user, info){
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);

};

module.exports.login_external_google = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log("in authenticate" + req);

  passport.authenticate('google', { scope : ['profile', 'email'] }/*function(err, user, info){
    var token;
console.log("in authenticate1");

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  }*/)(req, res);

};

module.exports.login_external_callback_google = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log(req.query);
  passport.authenticate('google', {
        failureRedirect: '/login_external'
    }, function(err,user,info){    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){

	var emailHash = crypto.randomBytes(20).toString('hex').concat(user._id);
	if(!user.emailVerified){
	User.findOneAndUpdate({ _id : user._id }, { 'emailVerificationHash':emailHash  }, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });

	 	   var sendsubmail = new Mailer({to: user.email, subject: 'Welcome To TheoreX ',text: 'Successfully Registered ', html: '<center><table width="700" background="#FFFFFF" style="text-align:left;" cellpadding="0" cellspacing="0"><tr>	<td height="18" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<td height="2" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><!--GREEN STRIPE--><tr>	<td background="" width="31" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF;" height="113">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<!--WHITE TEXT AREA-->	<td width="131" bgcolor="#FFFFFF" style="border-top:1px solid #FFF; text-align:center;" height="113" valign="middle">	<span style="font-size:30px; font-family:Josefin Sans; color:#00a0e3;">Thank You!</span>	</td>	<!--GREEN TEXT AREA-->	<td background="" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:15px;" height="113">	<span style="color:#FFFFFF; font-size:25px; font-family:Josefin Sans">For being grateful to your talent.</span>	</td></tr><!--DOUBLE BORDERS BOTTOM--><tr>	<td height="3" width="31" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<center>	<td colspan="3">	<!--CONTENT STARTS HERE-->	<br />	<br />	<table cellpadding="0" cellspacing="0">	<tr>	<td width="200"><div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div></td>	<td width="400" style="padding-right:10px; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" valign="top">	<span style="font-family:Josefin Sans; font-size:20px; font-weight:bold;">Hey, Welcome to <span style="color:#00a0e3">TheoreX</span></span>	<br />	<p style="font-family:Josefin Sans; font-size:15px;">You have now made us a stakeholder in your life! You are just a step away from Learn Create & Execute</p><center><a href="http://theorexedutech.com/emailverify/ '+ emailHash + '" style="color: #555; background: #00a0e3;color:#fff;text-decoration:none;padding:10px;font-size:20px;">Verify Email</a></center><br /><p style="font-family:Josefin Sans; font-size:15px;">In the meantime, you can <a href="http://theorexedutech.com/">return to our website</a> to continue browsing.</p>   <p style="font-family:Josefin Sans;font-size:12px;font-weight:bold;">Best Regards,<br/>   Team TheoreX   <br/></p>	</table><br /><table cellpadding="0" style="border-top:1px solid #e4e4e4; text-align:center; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" cellspacing="0" width="900"><tr>	<td height="2" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr>	<td style="font-family:Josefin Sans; font-size:12px; font-weight:bold;">	<br />	For more information get back to us at info@theorexedutech.com	</td></tr></table></center> ' }); 
	});
	}
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
	"username" : user.username,
	"userEmail" : user.email
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }})(req, res);

};

module.exports.login_external_facebook = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log("in authenticate" + req);

  passport.authenticate('facebook', { scope : ['email','user_friends'] })(req, res);

};

module.exports.login_external_callback_facebook = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log(req.query);
  passport.authenticate('facebook', {
        failureRedirect: '/login_external'
    }, function(err,user,info){    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
	"username" : user.username,
	"userEmail" : user.email
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }})(req, res);

};


module.exports.login_external_twitter = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log("in authenticate" + req);

  passport.authenticate('twitter', function(err, x, y){console.log(err);})(req, res);

};

module.exports.login_external_callback_twitter = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log(req.query);
  passport.authenticate('twitter', {
        failureRedirect: '/login_external'
    }, function(err,user,info){    var token;

    // If Passport throws/catches an error
    if (err) {
console.log(err);
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
	"username" : user.username,
	"userEmail" : user.email
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }})(req, res);

};

module.exports.login_external_linkedin = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log("in authenticate" + req);

  passport.authenticate('linkedin', function(err, x, y){console.log(err);})(req, res);

};

module.exports.login_external_callback_linkedin = function(req, res) {

  // if(!req.body.name || !req.body.email || !req.body.password) {
  //   sendJSONresponse(res, 400, {
  //     "message": "All fields required"
  //   });
  //   return;
  // }
console.log(req.query);
  passport.authenticate('linkedin', {
        failureRedirect: '/login_external'
    }, function(err,user,info){    var token;

    // If Passport throws/catches an error
    if (err) {
console.log(err);
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token,
	"username" : user.username,
	"userEmail" : user.email
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }})(req, res);

};

module.exports.verifyEmail = function(req, res) {

	User.findOneAndUpdate({ emailVerificationHash : req.body.params.emailHash }, { emailVerified : true },{upsert:true},  function(err, doc){
	    if (err) return res.send(500, { error: 'Invalid Request' });
	    return res.send("Email Verified");
	});

};
