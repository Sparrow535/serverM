// middleware/auth.js
const passport = require("passport");

const authenticateUser = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next(); // Proceed to the next middleware or route handler
  }
  res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
};

module.exports = authenticateUser;
