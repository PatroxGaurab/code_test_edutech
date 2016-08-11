var mongoose = require( 'mongoose' );

var courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  tags: {
    type: String
  },
  languages: {
    type: String,
  },
  icon: {
    type: String,
    lowercase: true
  },
  cover: {
    high_res : {
    	type: String,
	lowercase: true
    },
    low_res : {
    	type: String,
	lowercase: true
    }
  }
});


mongoose.model('Course', courseSchema);
