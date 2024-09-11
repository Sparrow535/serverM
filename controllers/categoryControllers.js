const Category = require("../models/Category");

// Function to create a new category
exports.createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await Category.create({ name, userId: req.user.id });
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get all categories for a user
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user.id });
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to update a category
exports.updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const updates = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true }
    );
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a category
exports.deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await Category.findByIdAndDelete(categoryId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
