var mongoose = require('mongoose');
var User = mongoose.model('User');
var discourse_sso = require('discourse-sso');
var sso = new discourse_sso("MY_SECRET");
var Course = mongoose.model('Course');
var Wishlist = mongoose.model('Wishlist');

module.exports.profileRead = function(req, res) {

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
	//res.status(200).json({redirect_to: sig});
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
		if(model.wishlists.indexOf(req.query.id)!=-1){
		    Wishlist.findOneAndUpdate(
			{userId:req.payload._id},
			{$pull: {"wishlists": req.query.id}},
			{safe: true, upsert: true, new : true},
			function(err, model) {
			    res.status(200).json({"message":"Successfully Saved"});
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
			    res.status(200).json({"message":"Successfully Saved"});
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
		if(model.wishlists.indexOf(req.query.id)!=-1){
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
	var redirect_to_url = 'http://ec2-54-169-87-58.ap-southeast-1.compute.amazonaws.com/session/sso_login?';
	//if(sso.validate(sso_payload, sig)) {
		var nonce = sso.getNonce(sso_payload);
		var userparams = {
			// Required, will throw exception otherwise 
			"nonce": nonce,
			"external_id": JSON.stringify(user._id),
			"email": user.email,
			// Optional 
			"username": user.name
			//"name": "Gaurab Patra"
		};
		var q = sso.buildLoginString(userparams);
		res.status(200).json({redirect_to: redirect_to_url+q});
	//}
	//res.status(200).json({redirect_to: sig});
      });
  }

};
