const express = require("express");
const {createFavorite , deleteFavoriteById} = require("../controllers/favorite")

const favoriteRoter = express.Router()
favoriteRoter.post("/",createFavorite)
favoriteRoter.delete("/:id" ,deleteFavoriteById);

module.exports = favoriteRoter;