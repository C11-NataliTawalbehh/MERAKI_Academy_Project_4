const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:{type:String},
    commenter:{type:mongoose.Schema.Types.ObjectId , ref:"User"}
})

module.exports = mongoose.models("Comment" , commentSchema);
