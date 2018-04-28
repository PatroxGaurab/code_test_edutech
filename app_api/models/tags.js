var mongoose = require( 'mongoose' );

var tagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true
  }
});


mongoose.model('Tag', tagSchema);
