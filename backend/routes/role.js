const express = require("express");
console.log("role routs");

const {createNewRole} = require("../controllers/role");

const roleRouter = express.Router();

roleRouter.post("/",createNewRole)

module.exports = roleRouter



// role :"User"
//permissions :["CREATE COMMENT" , "DELETE COMMENT"]


//role :"ADMEN"
//permissions :["CREATE PRODUCT", "DELETE PRODUCT" , 
//"UPDATE PRODUCT" ,"CREATE COMMENT" ,  "DELETE COMMENT" ,
// "UPDATE COMMENT"]