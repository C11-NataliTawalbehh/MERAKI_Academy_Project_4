const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    idProduct:{type:mongoose.Schema.Types.ObjectId , ref:"Product"},
    totalPrice:{type:Number},
    paymentIsCash:{type:Number}
})

module.exports = mongoose.model("Checkout" , checkoutSchema);
