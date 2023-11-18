const express = require("express");
const { pingController } = require("../controllers");

const router = express.Router();

router.get("/", pingController.getPing);

module.exports = router;
