var mongoose = require('mongoose');
var Course = mongoose.model('Course');
var Tag = mongoose.model('Tag');

module.exports.getCourses = function(req, res) {

	//res.status(200).json({redirect_to: "hi"});
	if(req.query.tags){
		var tags=req.query.tags;
	    Course
	      .find({tags:tags})
	      .exec(function(err, courses) {

		res.status(200).json(courses);
	      });
	}else if(req.query.id){
	    Course
	      .findById(req.query.id)
	      .exec(function(err, courses) {

		res.status(200).json(courses);
	      });
	}else{
	    Course
	      .find()
	      .exec(function(err, courses) {

		res.status(200).json(courses);
	      });
	}

};

module.exports.getTags = function(req, res) {

    Tag
      .find()
      .exec(function(err, tags) {

	res.status(200).json(tags);
      });

};
