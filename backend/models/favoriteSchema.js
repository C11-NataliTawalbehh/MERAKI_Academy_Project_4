const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  product: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product"
  }],
});

module.exports = mongoose.model('Favorite', favoriteSchema);