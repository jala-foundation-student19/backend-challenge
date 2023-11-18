const { TaskList } = require("../models");

const createTask = async ({
  name,
  deadline,
  category,
  description,
  notes,
  status,
}) => {
  await TaskList.create({
    name,
    deadline,
    category,
    description,
    notes,
    status,
  });

  const newTask = await TaskList.find({
    name,
    deadline,
    category,
    description,
    notes,
    status,
  });

  if (newTask.length > 0) {
    const payload = { code: 201, message: "New Task Created" };
    return { ...payload };
  }
  const payload = { code: 500, message: "Task Not Created" };
  return { ...payload };
};

module.exports = { createTask };
