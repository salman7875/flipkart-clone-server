const express = require("express");
const { checkAuthToken } = require("../Middleware/AuthToken");
const {
  addToCart,
  getCart,
  removeFromCart,
  changeProductQuantity,
} = require("../Controllers/User.controller");
const router = express.Router();

router
  .route("/cart")
  .post(checkAuthToken, addToCart)
  .get(checkAuthToken, getCart)
  .patch(checkAuthToken, changeProductQuantity);
router.delete("/cart/:id", checkAuthToken, removeFromCart);

module.exports = router;
