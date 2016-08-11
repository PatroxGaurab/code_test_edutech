var mongoose = require('mongoose');
var Campuschamp = mongoose.model('Campuschamp');
var Tag = mongoose.model('Tag');

module.exports.champApply = function(req, res) {
	//res.status(200).json({redirect_to: "hi"});
	if(req.body.campuschampdata){

	    Campuschamp
	      .find({email:req.body.campuschampdata.email}).count()
	      .exec(function(err, campuschamp) {
			if(campuschamp){
				return	res.status(200).json({"message":"Already Registered", "error":"1"});
			}else{
			    var campuschampUser = new Campuschamp();
				for (var prop in req.body.campuschampdata) {
				   campuschampUser[prop] = req.body.campuschampdata[prop];
				    
				}
				//console.log( campuschampUser);
			    campuschampUser
			      .save(function(err, campuschamp) {

				return	res.status(200).json({"message":"Successfully Registered","error":"0"});
			      });
			}
	      });
		
	}

};


