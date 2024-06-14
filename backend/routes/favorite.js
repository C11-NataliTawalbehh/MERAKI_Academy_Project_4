const express = require("express");
const {addFavorite , deleteFavoriteById} = require("../controllers/favorite")

const favoriteRoter = express.Router()
favoriteRoter.get("/",addFavorite)
favoriteRoter.delete("/:id" ,deleteFavoriteById);

module.exports = favoriteRoter;