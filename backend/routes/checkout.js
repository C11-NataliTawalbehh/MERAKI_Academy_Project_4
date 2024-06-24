const express = require("express");

const {createCheckout ,getAllOrderCheckout} = require("../controllers/checkout");
const checkoutRouter = express.Router();

const authentication =require("../middleware/authentication");
const authorization = require("../middleware/authorization");

checkoutRouter.post("/" ,authentication,createCheckout);
checkoutRouter.get("/" ,authentication,getAllOrderCheckout)

module.exports = checkoutRouter;