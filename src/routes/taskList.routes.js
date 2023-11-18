const express = require("express");
const { taskListController } = require("../controllers");

const router = express.Router();

router.get("/", taskListController.getTask);
router.post("/", taskListController.createTask);
router.put("/", taskListController.updateTask);
router.delete("/", taskListController.deleteTask);

module.exports = router;
