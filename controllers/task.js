const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findById(taskID); // או: findOne({ _id: taskID })
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    return res.status(200).json({ task });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateTask = async (req, res) => {
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findByIdAndDelete(taskID); // ← מחיקה בפועל
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    return res.status(204).send(); // אין גוף תגובה (אפשר גם 200 עם {msg:'deleted'})
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


    

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
