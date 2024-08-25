const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function () { return !this.googleId; },
    },
    resetPassword: {
      count: {
        type: Number,
        default: 0,
      },
      lastRequest: {
        type: Date,
        default: null,
      },
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;