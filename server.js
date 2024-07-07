const express = require("express");
const app = express();
const path = require('path');
const urlRoute = require("./routes/urlRouter");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors())
app.use(express.json());
app.use("/", urlRoute);
app.use(express.static(path.join(__dirname, 'build')));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database!");
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });
