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
  },
  category: {
    type: String,
    required: true,
    enums: [
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
    ],
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
