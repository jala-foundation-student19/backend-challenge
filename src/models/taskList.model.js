// As a user, I want to create new tasks easily and efficiently to quickly add items to my to-do list.
// This feature should include a clear and intuitive interface for adding new tasks, with options for setting deadlines (due date),
// categorizing tasks, set status (e.g., completed, overdue, etc.), and adding notes or descriptions as needed.
const mongoose = require("mongoose");

const taskListSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  deadline: {
    type: Date,
    required: false,
  },
  category: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: true,
    enum: ["completed", "overdue", "in progress"],
    default: "in progress",
  },
  deleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const TaskList = mongoose.model("TaskList", taskListSchema);

module.exports = TaskList;
