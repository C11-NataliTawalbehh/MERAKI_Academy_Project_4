const express = require('express');
const favoriteRouter = express.Router();
const {getFavorites,removeFromFavorites,addToFavorites} = require('../controllers/favorite');


const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");


// Add a product to user's favorites
favoriteRouter.post('/add', authentication,addToFavorites );

// Remove a product from user's favorites
favoriteRouter.delete('/remove/:productId', authentication,removeFromFavorites);

// Get user's favorites
favoriteRouter.get('/', authentication,getFavorites);

module.exports = favoriteRouter;