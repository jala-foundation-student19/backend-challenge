const express = require("express");
const { taskListController } = require("../controllers");

const router = express.Router();

router.post("/", taskListController.createTask);

module.exports = router;
