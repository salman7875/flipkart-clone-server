const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProduct,
  updateProduct,
  getBestProducts,
} = require("../Controllers/Product.controller");
const { checkAuthToken } = require("../Middleware/AuthToken");
const router = express.Router();

router.post("/", checkAuthToken, createProduct);
router.get("/", getAllProduct);
router.get("/best", getBestProducts);
router.get("/:id", getProduct);
router.put("/:id", checkAuthToken, updateProduct);

module.exports = router;
