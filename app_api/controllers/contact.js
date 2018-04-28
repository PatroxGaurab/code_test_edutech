var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');

module.exports.sendMessage = function(req, res) {
	//res.status(200).json({redirect_to: "hi"});
	if(req.body.contactdata){

			    var contact = new Contact();
				for (var prop in req.body.contactdata) {
				   contact[prop] = req.body.contactdata[prop];
				    
				}
				console.log( req.body.contactdata);
			    contact
			      .save(function(err, msg) {

				if(err){
					//console.log(err);
					return	res.status(401).json({"message":"Error","error":"1"});
				}
				else{
					return	res.status(200).json({"message":"Successfully Registered","error":"0"});
				}
				});
	}

};


