const express = require("express");
const app = express();
const path = require("path");
const urlRoute = require("./routes/urlRouter");
const cors = require("cors");
const mongoose = require("mongoose");
const WebSocket = require("ws");
const http = require("http");
require("dotenv").config();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(cors());
app.use(express.json());
app.use("/", urlRoute);
app.use(express.static(path.join(__dirname, "build")));

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to database!");
    server.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

// WebSocket setup
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("A new client connected");

  ws.on("message", (message) => {
    console.log("Received:", message);
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });
});
