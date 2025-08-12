import Task from "../models/Task.js";

export const addTask = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.body);
    const task = new Task({ userId: req.user._id, title });
    await task.save();
    res.status(201).json({ success: true, message: "Task added", task });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user._id });
    res.status(200).json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

