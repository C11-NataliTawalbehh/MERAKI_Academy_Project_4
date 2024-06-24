const express = require("express");

const {addCart , deleteCartById ,getAllCart , updateCartById , getCartById} = require("../controllers/favoriteCart")

const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const favoriteCartRouter = express.Router();

favoriteCartRouter.post("/:productId",authentication,addCart);
favoriteCartRouter.get("/:user",authentication,getAllCart);
favoriteCartRouter.get("/search/:cartId" ,authentication,getCartById);
favoriteCartRouter.delete("/:id",authentication,deleteCartById)
module.exports = favoriteCartRouter;