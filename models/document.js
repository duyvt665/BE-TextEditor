const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }},
//   userIds: {
//     type: [mongoose.Schema.Types.ObjectId],
//     ref: 'User',
//     default: []
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   }},
  {
    timestamps: true,
  },
);
module.exports = mongoose.model('Document', documentSchema);
