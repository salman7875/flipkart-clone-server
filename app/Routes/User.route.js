const express = require("express");
const { checkAuthToken } = require("../Middleware/AuthToken");
const {
  addToCart,
  getCart,
  removeFromCart,
} = require("../Controllers/User.controller");
const router = express.Router();

router.post("/cart", checkAuthToken, addToCart);
router.get("/cart", checkAuthToken, getCart);
router.delete("/cart/:id", checkAuthToken, removeFromCart);

module.exports = router;
