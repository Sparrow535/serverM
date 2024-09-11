const express = require("express");
const authenticateUser = require("../middleware/auth");
const {
  createUser,
  updateUserProfile,
  getUserProfile,
  deleteUserProfile,
} = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", createUser);

router.put("/:userId", updateUserProfile);

router.get("/:userId", getUserProfile);

router.delete("/:userId", authenticateUser, deleteUserProfile);

module.exports = router;
