const User = require("../models/User");
const bcrypt = require("bcrypt");
const Task = require("../models/Task");

exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.updateUserProfile = async (req, res) => {
  const { userId } = req.params;
  const { username, email, password } = req.body;

  try {
    const updates = {};
    if (username) updates.username = username;
    if (email) updates.email = email;
    if (password) updates.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to delete a user
exports.deleteUserProfile = async (req, res) => {
  const { userId } = req.params; // Get userId from the request parameters

  try {
    // Optionally, delete all tasks associated with the user
    await Task.deleteMany({ userId: userId });

    // Delete the user from the database
    await User.findByIdAndDelete(userId);
    res.status(204).send(); // No content to send back
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Function to get user profile
exports.getUserProfile = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
