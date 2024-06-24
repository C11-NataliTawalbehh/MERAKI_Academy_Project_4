console.log("product routes");
const express = require("express");
const {createNewProduct ,getAllProduct ,updateProductById ,deleteProductById ,getProductByCategory,searchProduct ,getProductById,updateRating} = require("../controllers/product");
const {createNewComment,deleteCommentById} = require("../controllers/comment");
const {addCart , deleteCartById ,getAllCart , updateCartById , getCartById} = require("../controllers/favoriteCart")
const productRouter = express.Router();

const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");


productRouter.post("/:id/comment" ,authentication,authorization("CREATE_COMMENT"), createNewComment);
productRouter.post("/" , authentication,authorization("CREATE_PRODUCT"),createNewProduct);
productRouter.get("/" , authentication,getAllProduct);
productRouter.put("/:id" ,authorization("UPDATE_PRODUCT"), updateProductById);
productRouter.delete("/:id" ,authentication,deleteProductById);
productRouter.delete("/:productId/comment/:commentId", deleteCommentById);
productRouter.get("/category/:category",authentication ,getProductByCategory)
productRouter.get("/search_1",authentication,searchProduct)
productRouter.get("/byId/:productId" ,authentication,getProductById)
productRouter.put("/:productId/updateRating",authentication,updateRating)
// productRouter.post("/cart",authentication,addCart);
// productRouter.get("/cart",authentication,getAllCart);
// productRouter.get("/:id/cart" ,authentication,getCartById);

module.exports = productRouter;