const mongoose = require("mongoose");

//schema
const themeEditSchema = mongoose.Schema({
  theme: String,
  tags: [String],
  description: String,
  defaultBudget: String,
  defaultDistance: String,
  ownerOfTheme: { type: mongoose.Schema.Types.String, ref: "users" },
  updatedAt: Date,
});

const ThemeEdit = mongoose.model("carts", themeEditSchema);

module.exports = ThemeEdit;
