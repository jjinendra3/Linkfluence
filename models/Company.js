const mongoose = require("mongoose");
const Users = require("./Users");
const { Schema } = mongoose;

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
    },
    products_id: {
      type: Array,
      of: String,
      default: ["init"],
    },
  }),
);

module.exports = mongoose.model("Company");
