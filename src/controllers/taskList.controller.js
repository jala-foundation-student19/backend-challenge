const { taskListService } = require("../services");

const createTask = async (req, res) => {
  try {
    const { name, deadline, category, description, notes, status } = req.body;
    const { code, message } = await taskListService.createTask({
      name,
      deadline,
      category,
      description,
      notes,
      status,
    });

    return res.status(code).json(message);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json(error.message);
    }
    return res.status(500).json("Internal System Error");
  }
};

const updateTask = async (req, res) => {
  try {
    const {
      oldName,
      newName,
      deadline,
      category,
      description,
      notes,
      status,
      deleted,
    } = req.body;

    const { code, message } = await taskListService.updateTask({
      oldName,
      newName,
      deadline,
      category,
      description,
      notes,
      status,
      deleted,
    });

    return res.status(code).json(message);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json(error.message);
    }
    return res.status(500).json("Internal System Error");
  }
};

const deleteTask = async (req, res) => {
  try {
    const { data } = req.body;

    const { code, message } = await taskListService.deleteTask({ data });

    return res.status(code).json(message);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json(error.message);
    }
    return res.status(500).json("Internal System Error");
  }
};

const getTask = async (req, res) => {
  try {
    const { sortBy, filterBy } = req.body;

    const { code, message } = await taskListService.getTask({
      sortBy,
      filterBy,
    });

    return res.status(code).json(message);
  } catch (error) {
    if (error.code) {
      return res.status(error.code).json(error.message);
    }
    return res.status(500).json("Internal System Error");
  }
};

module.exports = { createTask, updateTask, deleteTask, getTask };
