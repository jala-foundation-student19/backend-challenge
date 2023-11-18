const express = require("express");
const pingRoute = require("./ping.routes");
const taskListRoute = require("./taskList.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/ping",
    route: pingRoute,
  },
  {
    path: "/task",
    route: taskListRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
