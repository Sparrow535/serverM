const express = require("express");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskReports,
} = require("../controllers/taskControllers");
const router = express.Router();

// Middleware to authenticate user (to be implemented)
const authenticateUser = (req, res, next) => {
  req.user = { id: "someUserId" };
  next();
};

router.use(authenticateUser);

router.post("/", createTask);

router.get("/", getTasks);

router.put("/:taskId", updateTask);

router.delete("/:taskId", deleteTask);

router.get("/reports", getTaskReports);

module.exports = router;
