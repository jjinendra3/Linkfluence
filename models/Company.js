const mongoose = require("mongoose");
const Users = require("./Users");
const { Schema } = mongoose;

const Genres = [
  "Technology",
  "Fashion",
  "Food and Beverage",
  "Healthcare",
  "Automotive",
  "Entertainment",
  "Finance",
  "Travel",
  "Education",
  "Sports",
  "Retail",
  "Other",
];
const CompanySchema = Users.discriminator(
  "Company",
  new Schema({
    poc: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enums: Genres,
    },
    products_id: {
      type: Array,
      of: String,
      default: ["init"],
    },
    influencercontracts: {
      type: Array,
      of: String,
      default: ["init"],
      required: true,
    },
    eventcontracts: {
      type: Array,
      of: String,
      default: ["init"],
      required: true,
    },
  }),
);

module.exports = mongoose.model("Company");
