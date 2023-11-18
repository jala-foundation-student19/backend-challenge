const { TaskList } = require("../models");
const EditedError = require("../utils/editedError");

const createTask = async ({
  name,
  deadline,
  category,
  description,
  notes,
  status,
}) => {
  const checkTaskName = await TaskList.findOne({
    name,
  });

  if (checkTaskName) {
    throw new EditedError({ code: 400, message: "Name Already Taken" });
  }

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
  throw new EditedError({ code: 500, message: "Task Not Created" });
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
    throw new EditedError({ code: 500, message: "Task Not Found" });
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

const deleteTask = async ({ data }) => {
  const promises = data.map(async (task, index) => {
    const taskToDelete = await TaskList.findOne({ name: task.name });
    if (!taskToDelete) {
      throw new EditedError({
        code: 500,
        message: `Task At Index ${index} Not Found`,
      });
    }
    taskToDelete.status = "completed";
    taskToDelete.deleted = true;

    await taskToDelete.save();
  });

  await Promise.all(promises);

  const payload = { code: 201, message: "Tasks Deleted" };
  return { ...payload };
};

const getTask = async ({ sortBy, filterBy }) => {
  let sortQuery = {};
  let query = {};
  if (sortBy.date) {
    if (sortBy.date === "asc") {
      sortQuery.deadline = 1;
    } else {
      sortQuery.deadline = -1;
    }
  }
  if (filterBy.category) {
    query.category = filterBy.category;
  }

  if (filterBy.status) {
    query.status = filterBy.status;
  }

  const tasks = await TaskList.find({ ...query }).sort({ ...sortQuery });

  return {
    code: 200,
    message: tasks.map((task) => {
      const { name, deadline, category, description, notes, status, deleted } =
        task;
      return { name, deadline, category, description, notes, status, deleted };
    }),
  };
};

module.exports = { createTask, updateTask, deleteTask, getTask };
