const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
    provid:[{idProduct:{type:mongoose.Schema.Types.ObjectId , ref:"Product"},quantity:{type:String}}],
    paymentIsCash:{type:Boolean},
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
})

module.exports = mongoose.model("Checkout" , checkoutSchema);
