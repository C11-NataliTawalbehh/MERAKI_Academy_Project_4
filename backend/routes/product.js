console.log("product routes");
const express = require("express");
const {createNewProduct ,getAllProduct ,updateProductById ,deleteProductById ,getProductByCategory } = require("../controllers/product");
const {createNewComment,deleteCommentById} = require("../controllers/comment");
const {createCategory,getCategoryById ,getAllCategory,deleteCategoryById} = require("../controllers/category");
const productRoter = express.Router();

const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");


productRoter.post("/:id/comment" ,authentication,authorization("CREATE_COMMENT"), createNewComment);
productRoter.post("/" , authentication,authorization("CREATE_PRODUCT"),createNewProduct);
productRoter.get("/" , authentication,getAllProduct);
productRoter.put("/:id" ,authorization("UPDATE_PRODUCT"), updateProductById);
productRoter.delete("/:id" ,authentication,deleteProductById);
productRoter.delete("/:productId/comment/:commentId", deleteCommentById);
productRoter.get("/category/:category",authentication ,getProductByCategory)



module.exports = productRoter;