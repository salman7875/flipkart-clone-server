const express = require("express");
const {
  createRating,
  getRating,
  deleteRating,
} = require("../Controllers/Rating.controller");
const { checkAuthToken } = require("../Middleware/AuthToken");
const router = express.Router();

router.post("/:id", checkAuthToken, createRating);
router.get("/:id", getRating);
router.delete("/", checkAuthToken, deleteRating);

module.exports = router;
