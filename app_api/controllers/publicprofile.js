var mongoose = require('mongoose');
var User = mongoose.model('User');
var discourse_sso = require('discourse-sso');
var sso = new discourse_sso("MY_SECRET");

module.exports.publicProfileRead = function(req, res) {

console.log(req.query.username);
    User
      .findOne({username:req.query.username})
      .exec(function(err, user) {
	console.log(user);
	res.status(200).json(user);
      });
  
};



