const mongoose = require("mongoose");

const bugSchema = new mongoose.Schema({
  title: String,
  description: String,
  time: { type: Date, default: Date.now },
  date: { type: Date, default: Date.now },
  assignee: String,
  status: { type: String, default: "Open" },
});

module.exports = mongoose.model("Bug", bugSchema);
