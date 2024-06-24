const mongoose = require("mongoose")

const favoriteCartSchema = new mongoose.Schema({
    total: { type: Number },
    product: [{ id: { type: mongoose.Schema.Types.ObjectId, ref: "Product" }, quantity: { type: Number, default: 1 } }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

})
module.exports = mongoose.model("FavoriteCart", favoriteCartSchema)