const mongoose = require("mongoose");
console.log("role schema");
const roleSchema = new mongoose.Schema({
    role:{type:String},
    permissions:[{type:String}]
})

module.exports = mongoose.model("Role" , roleSchema);