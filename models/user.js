const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    username:{
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function() { return !this.googleId; },
    },
    googleId: { 
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  userIds: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'User',
    default: []
  }
},


);
module.exports = mongoose.model('Document', documentSchema);

const User = mongoose.model("User", userSchema);

module.exports = User;