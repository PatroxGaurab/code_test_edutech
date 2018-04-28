var mongoose = require( 'mongoose' );

var campuschampSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  studyyear: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  experience: {
    type: String,
    required: true
  },
  leadership: {
    type: String,
    required: true
  },
  benefit: {
    type: String,
    required: true
  },
});


mongoose.model('Campuschamp', campuschampSchema);
