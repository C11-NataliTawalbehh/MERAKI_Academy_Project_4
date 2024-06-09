console.log("product routes");
const express = require("express");
const {createNewProduct} = require("../controllers/product");
const {createNewComment} = require("../controllers/comment");
const productRoter = express.Router();

const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");


productRoter.post("/:id/comment" ,authentication,authorization("CREATE COMMENT"), createNewComment);
productRoter.post("/" , authentication,authorization("CREATE PRODUCT"),createNewProduct);

module.exports = productRoter;