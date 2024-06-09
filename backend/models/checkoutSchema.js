const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    idProduct:{type:mongoose.Schema.Types.ObjectId , ref:"Product"},
    totalPrice:{type:Number},
    paymentIsCash:{type:Boolean}
})

module.exports = mongoose.model("Checkout" , checkoutSchema);
