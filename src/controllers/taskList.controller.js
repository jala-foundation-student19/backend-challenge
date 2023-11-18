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
    return res.status(500).json("Internal System Error");
  }
};

module.exports = { createTask };
