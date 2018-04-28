var mongoose = require( 'mongoose' );

var connectionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    unique: true,
    required: true
  },
  connections : [{type: mongoose.Schema.Types.ObjectId}]
});


mongoose.model('Connection', connectionSchema);
