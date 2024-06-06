const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    age:{type:Number},
    email:{type:String},
    password:{type:String},
    role:{type: mongoose.Schema.Types.ObjectId, ref: "Role" },
    favorite:[{name:{type:String} , description:{type:String} ,price:{type:Number}}]
})

module.exports = mongoose.models("User" , userSchema);

