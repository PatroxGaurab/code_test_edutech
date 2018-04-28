var mongoose = require( 'mongoose' );

var bot_gamesSchema = new mongoose.Schema({
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
  }
});


mongoose.model('Bot_games', bot_gamesSchema);
