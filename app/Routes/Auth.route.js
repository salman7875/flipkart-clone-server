const express = require("express");
const {
  signup,
  login,
  forgetPassword,
  resetPassword,
} = require("../Controllers/Auth.controller");
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forget", forgetPassword);
router.put("/reset", resetPassword);

module.exports = router;
