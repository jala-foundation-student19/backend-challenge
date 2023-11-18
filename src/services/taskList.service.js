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

const updateTask = async ({
  oldName,
  newName,
  deadline,
  category,
  description,
  notes,
  status,
  deleted,
}) => {
  const toUpdateTask = await TaskList.findOne({
    name: oldName,
  });

  if (!toUpdateTask) {
    const payload = { code: 500, message: "Task Not Found" };
    return { ...payload };
  }

  if (newName) {
    toUpdateTask.name = newName;
  }
  if (deadline) {
    toUpdateTask.deadline = deadline;
  }
  if (category) {
    toUpdateTask.category = category;
  }
  if (description) {
    toUpdateTask.description = description;
  }
  if (notes) {
    toUpdateTask.notes = notes;
  }
  if (status) {
    toUpdateTask.status = status;
  }
  if (deleted === true || deleted === false) {
    toUpdateTask.deleted = deleted;
  }

  await toUpdateTask.save();

  const payload = { code: 201, message: "Task Updated" };
  return { ...payload };
};

module.exports = { createTask, updateTask };
