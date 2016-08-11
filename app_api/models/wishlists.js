var mongoose = require( 'mongoose' );

var wishlistSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  wishlists: [{type: mongoose.Schema.Types.ObjectId}]
});

mongoose.model('Wishlist', wishlistSchema);
