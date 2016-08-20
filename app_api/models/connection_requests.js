var mongoose = require( 'mongoose' );

var connection_requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  connection_requests : [{type: mongoose.Schema.Types.ObjectId}]
});


mongoose.model('Connection_request', connection_requestSchema);
