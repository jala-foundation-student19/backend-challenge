const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { createServer } = require("node:http");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT;
const server = createServer(app);

require("dotenv").config();

app.use(express.json());

app.use("/", routes);

mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});
