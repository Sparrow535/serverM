const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, description, dueDate, priority } = req.body;
  try {
    const newTask = await Task.create({
      title,
      description,
      dueDate,
      priority,
      userId: req.user.id,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  const { taskId } = req.params;
  const updates = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, updates, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    await Task.findByIdAndDelete(taskId);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getTaskReports = async (req, res) => {
  const { startDate, endDate } = req.query;

  try {
    const tasks = await Task.find({
      userId: req.user.id,
      dueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
