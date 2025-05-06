const mongoose = require("mongoose");

//schema
const themesSchema = mongoose.Schema({
  theme: String,
  tags: [String],
  description: String,
  defaultBudget: String,
  defaultDistance: String,
});

const Themes = mongoose.model("carts", themesSchema);

module.exports = Themes;