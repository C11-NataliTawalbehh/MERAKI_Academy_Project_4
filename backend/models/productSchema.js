const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String},
    description:{type:String },
    price:{type:String },
    image:[{type:String   }],
    quantity:{type:Number },
    comment:[{type:mongoose.Schema.Types.ObjectId,ref:"Comment" }],
    user:{type:mongoose.Schema.Types.ObjectId , ref:"User" },
    category:{type:String},
    rating:{type:Number , default:0}

})

module.exports = mongoose.model("Product" , productSchema);
