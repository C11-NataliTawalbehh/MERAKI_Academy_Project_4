const favoriteModel = require('../models/favoriteSchema');
const userModel = require('../models/userSchema');
const productModel = require("../models/productSchema")

// Add a product to user's favorites
const addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await userModel.findById(req.token.userid);
    
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ msg: 'Product not found' });
    }

    let favorite = await favoriteModel.findOne({ user: req.token.userid });

    if (!favorite) {
      favorite = new favoriteModel({ user: req.token.userid, products: [] });
    }

    if (favorite.products.includes(productId)) {
      return res.status(400).json({ msg: 'Product already in favorites' });
    }

    favorite.products.push(productId);
    await favorite.save();

    res.json(favorite);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Remove a product from user's favorites
 const removeFromFavorites = async (req, res) => {
  try {
    const { productId } = req.params;
    const favorite = await favoriteModel.findOne({ user: req.token.userid });

    if (!favorite) {
      return res.status(404).json({ msg: 'Favorites not found' });
    }

    if (!favorite.products.includes(productId)) {
      return res.status(400).json({ msg: 'Product not in favorites' });
    }

    favorite.products = favorite.products.filter(p => p.toString() !== productId);
    await favorite.save();

    res.json(favorite);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get user's favorites
const getFavorites = async (req, res) => {
  try {
    const favorite = await favoriteModel.findOne({ user: req.token.userid }).populate('products');

    if (!favorite) {
      return res.status(404).json({ msg: 'Favorites not found' });
    }

    res.json(favorite.products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

module.exports ={getFavorites,removeFromFavorites,addToFavorites}