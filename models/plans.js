const mongoose = require("mongoose");

//sub-document
const planSchema = mongoose.Schema({
  theme: String,
  placesVisited: [String],
  location: String,
  date: Date,
  price: Number,
  article: { type: mongoose.Schema.Types.ObjectId, ref: "articles" },
});

//schema
const plansSchema = mongoose.Schema({
  plans: [planSchema],
  ownerOfPlans: { type: mongoose.Schema.Types.String, ref: "users" },
});

const Plans = mongoose.model("carts", plansSchema);

module.exports = Plans;
