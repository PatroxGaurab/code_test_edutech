var mongoose = require('mongoose');
var User = mongoose.model('User');
var Connection = mongoose.model('Connection');
var Connection_request = mongoose.model('Connection_request');
var discourse_sso = require('discourse-sso');
var sso = new discourse_sso("MY_SECRET");
var Course = mongoose.model('Course');
var Wishlist = mongoose.model('Wishlist');
var Mailer = require('./sendmail');
var crypto = require('crypto');
var uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs');
var AWS = require('aws-sdk');

module.exports.profileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findOne({_id:req.payload._id})
      .exec(function(err, user) {

	//res.redirect('http://www.google.com');
        //res.status(200).send({redirect_to: 'http://www.google.com'});
	//var sso_payload = req.query.sso; // fetch from incoming request 
	//var sig = req.query.sig; // fetch from incoming request 
	//var redirect_to_url = 'http://54.169.85.240/session/sso_login?';
	//if(sso.validate(sso_payload, sig)) {
		//var nonce = sso.getNonce(sso_payload);
		//var userparams = {
			// Required, will throw exception otherwise 
			//"nonce": nonce,
			//"external_id": user._id,
			//"email": user.email,
			// Optional 
			//"username": "Pat",
		//	//"name": "Gaurab Patra"
		//};
		//var q = sso.buildLoginString(userparams);
		//res.status(200).json({redirect_to: redirect_to_url+q});
	//}
	res.status(200).json(user);
      });
  }

};

module.exports.toggleWishlist = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    Course
      .findById(req.query.id)
      .exec(function(err, course) {
	if(course){

	Wishlist.findOne({userId:req.payload._id},function(err, model){
		if(model && model.wishlists.indexOf(req.query.id)!=-1){
		    Wishlist.findOneAndUpdate(
			{userId:req.payload._id},
			{$pull: {"wishlists": req.query.id}},
			{safe: true, upsert: true, new : true},
			function(err, model) {

			    Course.findOneAndUpdate({_id: req.query.id},
				{$inc: {"wishlisted": -1}},
				{safe: true, upsert: true, new : true},
				function(err, model) {
				    res.status(200).json({"message":"Successfully Saved"});
				    console.log(err);
				}
			    );
			    console.log(err);
			}
		    );
		}
		else{
		    Wishlist.findOneAndUpdate(
			{userId:req.payload._id},
			{$push: {"wishlists": req.query.id}},
			{safe: true, upsert: true, new : true},
			function(err, model) {
			    Course.findOneAndUpdate({_id: req.query.id},
				{$inc: {"wishlisted": 1}},
				{safe: true, upsert: true, new : true},
				function(err, model) {
				    res.status(200).json({"message":"Successfully Saved"});
				    console.log(err);
				}
			    );
			    console.log(err);
			}
		    );
		}

	});

	    /*Wishlist.findOneAndUpdate(
		{userId:req.payload._id},
		{$push: {"wishlists": req.query.id}},
		{safe: true, upsert: true, new : true},
		function(err, model) {
		    console.log(err);
		}
	    );
	    res.status(200).json({"message":"Successfully Saved"});*/
	}else{
	    res.status(401).json({
	      "message" : "Course Not Found"
	    });
	}
      });
  }

};

module.exports.isWishlisted = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

    Course
      .findById(req.query.id)
      .exec(function(err, course) {
	if(course){

	Wishlist.findOne({userId:req.payload._id},function(err, model){
		if(model && model.wishlists.indexOf(req.query.id)!=-1){
		    res.status(200).json({isWishlisted:true});
		}
		else{
		    res.status(200).json({isWishlisted:false});
		}

	});

	}else{
	    res.status(401).json({
	      "message" : "Course Not Found"
	    });
	}
      });
  }

};

module.exports.forumProfileRead = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
    User
      .findById(req.payload._id)
      .exec(function(err, user) {

	//res.redirect('http://www.google.com');
        //res.status(200).send({redirect_to: 'http://www.google.com'});
	var sso_payload = req.query.sso; // fetch from incoming request 
	var sig = req.query.sig; // fetch from incoming request 

	//var sso_payload = req.session.sso; // fetch from incoming request 
	//var sig = req.session.sig; // fetch from incoming request 
	var redirect_to_url = 'http://forum.theorexedutech.com/session/sso_login?';
	if(user){
	//if(sso.validate(sso_payload, sig)) {
		var nonce = sso.getNonce(sso_payload);
		var userparams = {
			// Required, will throw exception otherwise 
			"nonce": nonce,
			"external_id": JSON.stringify(user._id),
			"email": user.email,
			// Optional 
			"username": user.username,
			"avatar_url":user.profilepic
			//"name": "Gaurab Patra"
		};
		var q = sso.buildLoginString(userparams);
		if(user.emailVerified){
			res.status(200).json({redirect_to: redirect_to_url+q, is_verified: true});
		}else{
			res.status(200).json({redirect_to: redirect_to_url, is_verified: false});
		}
	}else{
		res.status(200).json({redirect_to: redirect_to_url, is_verified: false});
	}
	//}
	//res.status(200).json({redirect_to: sig});
      });
  }

};

module.exports.isUsernameUnique = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	//res.status(200).json({is_unique: true});
	User.findOne({ 'username' : req.query.username }, function(err, user) {
		if(err){
			res.status(401).json({
		          "message" : "UnauthorizedError: private profile"
		        });
		}
		if(user){
			res.status(200).json({is_unique: false});
		}else{
			res.status(200).json({is_unique: true});
		}

        });
  }

};

module.exports.isEmailVerified = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	//res.status(200).json({is_unique: true});
	User.findById(req.payload._id, function(err, user) {
		if(err){
			res.status(401).json({
		          "message" : "UnauthorizedError: private profile"
		        });
		}
		if(user && user.emailVerified){
			res.status(200).json({is_verified: true});
		}else{
			res.status(200).json({is_verified: false});
		}

        });
  }

};

module.exports.saveUsername = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	//res.status(200).json({is_unique: true});

	User.findOneAndUpdate({ _id : req.payload._id }, { 'username' : req.body.params.username }, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send("succesfully saved");
	});
  }

};

module.exports.connectToUser= function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	User.findOne({'username':req.body.params.username},function(err,data){
		if(data){
			var requested_id = data._id;

		Connection_request.findOne({userId:requested_id},function(err, model){
			if(model && model.connection_requests.indexOf(req.payload._id)!=-1){
				    res.status(200).json({"message":"Already Requested For Connection"});
			}
			else{
			    Connection_request.findOneAndUpdate(
				{userId:requested_id},
				{$push: {"connection_requests": req.payload._id}},
				{safe: true, upsert: true, new : true},
				function(err, model) {
				    res.status(200).json({"message":"Connection Request Sent"});
				    console.log(err);
				}
			    );
			}

		});


		}	
	}
	);

  }

};

module.exports.acceptConnect= function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {

			var requested_id = req.body.params.userId;

		Connection_request.findOne({userId:req.payload._id},function(err, model){
			if(model && model.connection_requests.indexOf(requested_id)!=-1){

			    Connection.findOne({userId:req.payload._id},function(err, user){
				if(user && user.connections.indexOf(requested_id)!=-1){
			    		res.status(200).json({"message":"Already A Connection"});
				}else{
				    Connection_request.findOneAndUpdate(
					{userId:req.payload._id},
					{$pull: {"connection_requests": requested_id}},
					{safe: true, upsert: true, new : true},
					function(err, model) {
					    console.log(err);
					}
				    );	

				    Connection.findOneAndUpdate(
					{userId:req.payload._id},
					{$push: {"connections": requested_id}},
					{safe: true, upsert: true, new : true},
					function(err, model) {
					    console.log(err);
					    Connection.findOneAndUpdate(
						{userId:requested_id},
						{$push: {"connections": req.payload._id}},
						{safe: true, upsert: true, new : true},
						function(err, model) {
				    		    res.status(200).json({"message":"Connection Accepted."});
						    console.log(err);
						}
					    );
					}
				    );

			        }
			    });
			   
			}
			else{
			    res.status(200).json({"message":"Invalid Request"});

			}

		});

  }

};

module.exports.isEmailUnique = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	//res.status(200).json({is_unique: true});
	User.findOne({ 'email' : req.query.setemail }, function(err, user) {
		if(err){
			res.status(401).json({
		          "message" : "UnauthorizedError: private profile"
		        });
		}
		if(user){
			res.status(200).json({is_unique: false});
		}else{
			res.status(200).json({is_unique: true});
		}

        });
  }

};

module.exports.saveEmail = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	//res.status(200).json({is_unique: true});
	var emailHash = crypto.randomBytes(20).toString('hex').concat(req.payload._id);
	User.findOneAndUpdate({ _id : req.payload._id }, { 'email' : req.body.params.setemail, 'emailVerificationHash':emailHash  }, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    var sendsubmail = new Mailer({to: req.body.params.setemail, subject: 'Welcome To TheoreX ✔',text: 'Successfully Registered 🐴', html: '<center><table width="700" background="#FFFFFF" style="text-align:left;" cellpadding="0" cellspacing="0"><tr>	<td height="18" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<td height="2" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><!--GREEN STRIPE--><tr>	<td background="" width="31" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF;" height="113">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<!--WHITE TEXT AREA-->	<td width="131" bgcolor="#FFFFFF" style="border-top:1px solid #FFF; text-align:center;" height="113" valign="middle">	<span style="font-size:30px; font-family:Josefin Sans; color:#00a0e3;">Thank You!</span>	</td>	<!--GREEN TEXT AREA-->	<td background="" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:15px;" height="113">	<span style="color:#FFFFFF; font-size:25px; font-family:Josefin Sans">For being grateful to your talent.</span>	</td></tr><!--DOUBLE BORDERS BOTTOM--><tr>	<td height="3" width="31" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<center>	<td colspan="3">	<!--CONTENT STARTS HERE-->	<br />	<br />	<table cellpadding="0" cellspacing="0">	<tr>	<td width="200"><div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div></td>	<td width="400" style="padding-right:10px; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" valign="top">	<span style="font-family:Josefin Sans; font-size:20px; font-weight:bold;">Hey, Welcome to <span style="color:#00a0e3">TheoreX</span></span>	<br />	<p style="font-family:Josefin Sans; font-size:15px;">You have now made us a stakeholder in your life! You are just a step away from Learn Create & Execute</p><center><a href="http://theorexedutech.com/emailverify/'+ emailHash + '" style="color: #555; background: #00a0e3;color:#fff;text-decoration:none;padding:10px;font-size:20px;">Verify Email</a></center><br /><p style="font-family:Josefin Sans; font-size:15px;">In the meantime, you can <a href="http://theorexedutech.com/">return to our website</a> to continue browsing.</p>   <p style="font-family:Josefin Sans;font-size:12px;font-weight:bold;">Best Regards,<br/>   Team TheoreX   <br/></p>	</table><br /><table cellpadding="0" style="border-top:1px solid #e4e4e4; text-align:center; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" cellspacing="0" width="900"><tr>	<td height="2" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr>	<td style="font-family:Josefin Sans; font-size:12px; font-weight:bold;">	<br />	For more information get back to us at info@theorexedutech.com	</td></tr></table></center> ' });

	    return res.send("succesfully saved");
	});
  }

};


module.exports.resendEmail = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	var emailHash = crypto.randomBytes(20).toString('hex').concat(req.payload._id);
	User.findOneAndUpdate({ _id : req.payload._id }, { 'emailVerificationHash':emailHash  }, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err })
	    var sendsubmail = new Mailer({to: req.payload.email, subject: 'Welcome To TheoreX',text: 'Successfully Registered ', html: '<center><table width="700" background="#FFFFFF" style="text-align:left;" cellpadding="0" cellspacing="0"><tr>	<td height="18" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="18" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<td height="2" width="31" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="2" width="466" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><!--GREEN STRIPE--><tr>	<td background="" width="31" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF;" height="113">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<!--WHITE TEXT AREA-->	<td width="131" bgcolor="#FFFFFF" style="border-top:1px solid #FFF; text-align:center;" height="113" valign="middle">	<span style="font-size:30px; font-family:Josefin Sans; color:#00a0e3;">Thank You!</span>	</td>	<!--GREEN TEXT AREA-->	<td background="" bgcolor="#00a0e3" style="border-top:1px solid #FFF; border-bottom:1px solid #FFF; padding-left:15px;" height="113">	<span style="color:#FFFFFF; font-size:25px; font-family:Josefin Sans">For being grateful to your talent.</span>	</td></tr><!--DOUBLE BORDERS BOTTOM--><tr>	<td height="3" width="31" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" width="131">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td>	<td height="3" style="border-top:1px solid #e4e4e4; border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr><tr>	<center>	<td colspan="3">	<!--CONTENT STARTS HERE-->	<br />	<br />	<table cellpadding="0" cellspacing="0">	<tr>	<td width="200"><div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div></td>	<td width="400" style="padding-right:10px; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" valign="top">	<span style="font-family:Josefin Sans; font-size:20px; font-weight:bold;">Hey, Welcome to <span style="color:#00a0e3">TheoreX</span></span>	<br />	<p style="font-family:Josefin Sans; font-size:15px;">You have now made us a stakeholder in your life! You are just a step away from Learn Create & Execute</p><center><a href="http://theorexedutech.com/emailverify/'+ emailHash + '" style="color: #555; background: #00a0e3;color:#fff;text-decoration:none;padding:10px;font-size:20px;">Verify Email</a></center><br /><p style="font-family:Josefin Sans; font-size:15px;">In the meantime, you can <a href="http://theorexedutech.com/">return to our website</a> to continue browsing.</p>   <p style="font-family:Josefin Sans;font-size:12px;font-weight:bold;">Best Regards,<br/>   Team TheoreX   <br/></p>	</table><br /><table cellpadding="0" style="border-top:1px solid #e4e4e4; text-align:center; font-family:Trebuchet MS, Verdana, Arial; font-size:12px;" cellspacing="0" width="900"><tr>	<td height="2" style="border-bottom:1px solid #e4e4e4;">	<div style="line-height: 0px; font-size: 1px; position: absolute;">&nbsp;</div>	</td></tr>	<td style="font-family:Josefin Sans; font-size:12px; font-weight:bold;">	<br />	For more information get back to us at info@theorexedutech.com	</td></tr></table></center> ' });;
	    return res.send("succesfully saved");
	});
  }

};



module.exports.profileEdit = function(req, res) {
  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
	User.findOneAndUpdate({ _id : req.payload._id }, req.body.updateParam , {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send("succesfully saved");
	});
	//res.status(200).json(req.body.name);

  }

};


module.exports.uploadImage = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {
//console.log(req.files.file);
      var file = req.files.file;
      var contentType = file.headers['content-type'];
      var extension = file.path.substring(file.path.lastIndexOf('.'));

      var destPath = 'profilepic/' + uuid.v4() + extension;

      var headers = {
        'x-amz-acl': 'public-read',
        'Content-Length': file.size,
        'Content-Type': contentType
      };

AWS.config.region = 'ap-south-1';
AWS.config.accessKeyId = 'AKIAIY2BTOJFMD62ITVQ';
AWS.config.secretAccessKey = '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';

var s3Bucket = new AWS.S3( { params: {Bucket: 'theorexbucket'} } );
var data = {Key: destPath, Body: require('fs').createReadStream(file.path), ACL: 'public-read',ContentType:contentType};
s3Bucket.putObject(data, function(err, data){
  if (err) 
    { console.log('Error uploading data: ', err); 
    } else {
	User.findOneAndUpdate({ _id : req.payload._id }, {'profilepic':'https://s3.ap-south-1.amazonaws.com/theorexbucket/'+destPath} , {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: err });
	    return res.send({data:'https://s3.ap-south-1.amazonaws.com/theorexbucket/'+destPath});
	});
    }
});

  }

};

module.exports.getConnectionRequests= function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {	
	var requests=[];
		Connection_request.findOne({userId:req.payload._id},function(err, model){
			if(model){
				var connection_requests=model.connection_requests;
				    User.find({'_id': {'$in' : connection_requests}},function(err, items) {
                	              res.status(200).json(items);
                		    });

			}
		});

  }

};

module.exports.getConnections= function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "message" : "UnauthorizedError: private profile"
    });
  } else {	
	var requests=[];
		Connection.findOne({userId:req.payload._id},function(err, model){
			if(model){
				var connections=model.connections;
				    User.find({'_id': {'$in' : connections}},function(err, items) {
                	              res.status(200).json(items);
                		    });

			}
		});

  }

};
