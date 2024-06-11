const express = require("express");
console.log("role routs");

const {createNewRole} = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/",createNewRole)

module.exports = roleRouter



// role :"User"
//permissions :["CREATE_COMMENT" , "DELETE_COMMENT"]


//role :"ADMEN"
//permissions :["CREATE_PRODUCT", "DELETE_PRODUCT" , 
//"UPDATE_PRODUCT" ,"CREATE_COMMENT" ,  "DELETE_COMMENT" ,
// "UPDATE_COMMENT"]