const mongoose = require("mongoose");

const userFolderSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      required: true,
    },
    documents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document"
    }],
  });

  module.exports = mongoose.model("UserFolder", userFolderSchema);
