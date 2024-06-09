console.log("product routes");
const express = require("express");
const {createNewProduct ,getAllProduct ,updateProductById ,deleteProductById } = require("../controllers/product");
const {createNewComment} = require("../controllers/comment");
const {createCategory,getCategoryById} = require("../controllers/category");
const productRoter = express.Router();

const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");


productRoter.post("/:id/comment" ,authentication,authorization("CREATE_COMMENT"), createNewComment);
productRoter.post("/" , authentication,authorization("CREATE_PRODUCT"),createNewProduct);
productRoter.get("/" , authentication,getAllProduct);
productRoter.put("/:id" , updateProductById);
productRoter.delete("/:id" ,deleteProductById);
productRoter.post("/category",authentication,createCategory);
productRoter.get("/:id/category",authentication,getCategoryById);


module.exports = productRoter;