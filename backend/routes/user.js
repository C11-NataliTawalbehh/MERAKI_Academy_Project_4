console.log("user routs");
const express = require("express");
const {register , login } = require("../controllers/user");
// const {addFavorite , deleteFavoriteById ,getAllFavorite} = require("../controllers/favorite")
const userRouter = express.Router();

const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");

userRouter.post("/register" , register);
userRouter.post("/login" , login);

// userRoter.put("/favorite",authentication,addFavorite);
// userRoter.get("/favorite",authentication,getAllFavorite);

module.exports = userRouter;