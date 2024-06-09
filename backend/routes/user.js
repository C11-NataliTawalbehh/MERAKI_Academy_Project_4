console.log("user routs");
const express = require("express");
const {register ,login} = require("../controllers/user");
const userRoter = express.Router();

userRoter.post("/register" , register);
userRoter.post("/login" , login)

module.exports = userRoter;