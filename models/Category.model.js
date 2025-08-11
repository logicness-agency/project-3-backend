const { Schema, model } = require("mongoose");

const categorySchema = new Schema({
  name: { type: String, required: true, trim: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

//per username only one same name
categorySchema.index({ owner: 1, name: 1 }, { unique: true });

module.exports = model("Category", categorySchema);
