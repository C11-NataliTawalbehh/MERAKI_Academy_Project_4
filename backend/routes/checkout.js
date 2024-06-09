const express = require("express");

const {createCheckout} = require("../controllers/checkout");
const checkoutRoter = express.Router();

checkoutRoter.post("/" ,createCheckout);

module.exports = checkoutRoter;