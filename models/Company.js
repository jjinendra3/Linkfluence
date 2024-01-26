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
  }),
);

module.exports = mongoose.model("Company");
