const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    owner:{
        type: String,
        required: true,
      },
    parent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
    documents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document"
    }],
    subfolders: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder"
    }],
    permissions: {
      type: Map,
      of: {
        type: String,
        enum: ["view", "edit"],
      },
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Folder", folderSchema);