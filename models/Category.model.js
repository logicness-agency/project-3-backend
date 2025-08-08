const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: String,
  owner: {
     type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = model("Category", categorySchema);
