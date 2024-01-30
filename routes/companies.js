const express = require("express");
const app = express.Router();
const CompanyProducts = require("../models/CompanyProducts");
const Company = require("../models/Company");
const CheckUser = require("../middleware/CheckUser");
app.post("/add-company-product", CheckUser, async (req, res) => {
  if (!req.checker || req.type !== "Company") {
    res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const { name, desc, price, categories, userid, images } = req.body;

    let pricer = parseInt(price);
    const adder = await CompanyProducts.create({
      name: name,
      desc: desc,
      price: pricer,
      categories: categories,
      images: images,
      company_id: userid,
    });
    const Com = await Company.findOne({ _id: userid });
    Com.products_id.push(adder._id.toString());
    return res.send({
      success: true,
      message: "files uploaded to firebase storage",
    });
  } catch (error) {
    return res.status(400).send({ success: false, error: error.message });
  }
});

module.exports = app;
