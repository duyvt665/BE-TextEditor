const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: false,
    },
    owner:{
      type: String,
      required: true,
    },
    userIds: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "User",
      default: [],
    },
    permissions: {
      type: Map,
      of: {
        type: String,
        enum: ["view", "edit"],
      },
      default: {},
    },
    folder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Folder",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Document", documentSchema);
