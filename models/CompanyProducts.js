const mongoose = require("mongoose");
const { Schema } = mongoose;

const CompanyProducts = new Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  categories: {
    type: Array,
    required: true,
  },
  images: {
    //not required because it might be a service that is to be sponsored (eg:UrbanCompany)
    type: Array,
    default: ["init"],
  },
  company_id: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CompanyProducts", CompanyProducts);
