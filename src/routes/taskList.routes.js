const express = require("express");
const { taskListController } = require("../controllers");

const router = express.Router();

router.post("/", taskListController.createTask);
router.put("/", taskListController.updateTask);

module.exports = router;
