const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: String,
  description: String,
  date: Date,
  location: {
    type: String,
    enum: ["indoor", "outdoor"]
  },
  status: {
    type: String,
    enum: ["pending", "in-progress", "done"],
    default: "pending"
  },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  owner: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = model("Task", taskSchema);
