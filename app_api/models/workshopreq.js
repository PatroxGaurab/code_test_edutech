var mongoose = require( 'mongoose' );

var workshopreqSchema = new mongoose.Schema({
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
  workshopreq: {
    type: String,
    required: true
  },
  workshopreqAddress: {
    type: String,
    required: true
  },
  workshopreqPostalCode: {
    type: String,
    required: true
  },
  workshopreqCity: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  capacity: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
});


mongoose.model('Workshopreq', workshopreqSchema);
