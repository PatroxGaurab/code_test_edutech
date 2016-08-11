var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

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

	User.findOneAndUpdate({ emailVerificationHash : req.body.params.emailHash }, { 'emailVerified' : true }, {upsert:true}, function(err, doc){
	    if (err) return res.send(500, { error: 'Invalid Request' });
	    return res.send("Email Verified");
	});

};
