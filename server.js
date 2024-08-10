const express = require("express");
const app = express();
const path = require("path");
const urlRoute = require("./routes/urlRouter");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const { Server } = require("socket.io");
const Document = require("./models/document");

require("dotenv").config();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("join-document", (documentId) => {
    socket.join(documentId);
    console.log(`User joined document: ${documentId}`);
  });

  socket.on("document-update", async ({ documentId, content }) => {
    
    try {
      await Document.findByIdAndUpdate(documentId, { content: content });
      io.to(documentId).emit("document-update", content);
    } catch (error) {
      console.error("Error updating document:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

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

