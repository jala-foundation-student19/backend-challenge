const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

const app = express();
const PORT = 3000;

require("dotenv").config();

app.use(express.json());

app.use("/", routes);

let server;
mongoose.connect(process.env.MONGODB_URL).then(() => {
  console.log("Connected to MongoDB");
  server = app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});
