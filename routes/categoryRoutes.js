const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryControllers");
const router = express.Router();

// Middleware to authenticate user (to be implemented)
const authenticateUser = (req, res, next) => {
  req.user = { id: "someUserId" };
  next();
};

router.use(authenticateUser);

// Create a new category
router.post("/", createCategory);

// Get all categories for the user
router.get("/", getCategories);

// Update a category
router.put("/:categoryId", updateCategory);

// Delete a category
router.delete("/:categoryId", deleteCategory);

module.exports = router;
