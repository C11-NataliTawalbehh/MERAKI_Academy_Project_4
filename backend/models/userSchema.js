const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    age:{type:Number},
    email:{type:String},
    password:{type:String},
    role:{type: mongoose.Schema.Types.ObjectId, ref: "Role" },
})

module.exports = mongoose.model("User" , userSchema);

