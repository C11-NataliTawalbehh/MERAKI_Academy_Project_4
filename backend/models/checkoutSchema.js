const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    provid:[{idProduct:{type:mongoose.Schema.Types.ObjectId , ref:"FavoriteCart"},quantity:{type:String}}],
    paymentIsCash:{type:Boolean},
    fullName: {type: String, required: true},
    phoneNumber: {type: Number, required: true},
    country: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true}
})

module.exports = mongoose.model("Checkout" , checkoutSchema);
