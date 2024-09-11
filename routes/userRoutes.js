const express = require("express");
const {
  createUser,
  updateUserProfile,
  getUserProfile,
} = require("../controllers/userController");
const router = express.Router();

router.post("/register", createUser);

router.put("/:userId", updateUserProfile);

router.get("/:userId", getUserProfile);

module.exports = router;
