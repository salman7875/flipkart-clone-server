const express = require("express");
const {
  createOrder,
  verifySignature,
} = require("../Controllers/Order.controller");
const { checkAuthToken } = require("../Middleware/AuthToken");
const router = express.Router();

router.post("/create", checkAuthToken, createOrder);
router.post("/verify", checkAuthToken, verifySignature);

module.exports = router;
