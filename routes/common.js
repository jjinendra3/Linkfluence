const express = require("express");
const app = express();
const Influencer = require("../models/Influencers");
const CompanyProducts = require("../models/CompanyProducts");
const Event = require("../models/Events");
const CheckUser = require("../middleware/CheckUser");

app.get("/get/:type/:id", CheckUser, async function (req, res) {
    if (!req.checker) {
     return res.status(201).json({
        success: false,
        message: "User Not Found!",
      });
    }
    try {
    let response;
    let type=req.params.type;
    if(type.toUpperCase()==="EVENT"){
        response = await Event.findById(req.params.id);
    }
    else if(type.toUpperCase()==="INFLUENCER"){
       response = await Influencer.findById(req.params.id);
    }
    
    else if(type.toUpperCase()==="COMPANYPRODUCT"){
        response = await CompanyProducts.findById(req.params.id);
    }
    else{
        return res.status(201).json({
            success: false,
            message: "Give Correct Type",
          });
    }
      return res.send({ success: true, response: response });
    } catch (error) {
      return res.send({ success: false, error: error });
    }
  });
  
  
app.post("/getbygenre/:type", CheckUser, async function (req, res) {
  if (!req.checker) {
   return res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const { genres } = req.body;
    if (!genres || !Array.isArray(genres) || genres.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty genres array",
      });
    }
  let response;
  let type=req.params.type;
  if(type.toUpperCase()==="EVENT"){
    const events = await Event.find({ theme: { $in: genres } });
    response = events.map((event) => ({
      _id: event._id,
      name: event.name,
      firstImage: event.images[0],
      theme: event.theme,
      venue:event.venue
    }));
  }
  else if(type.toUpperCase()==="INFLUENCER"){
    const influencers = await Influencer.find({ genre: { $in: genres } });
    response = influencers.map((event) => ({
      _id: event._id,
      name: event.name,
      firstImage: event.photo,
      genre: event.genre,
      platform:event.platform
    }));
  }
  else if(type.toUpperCase()==="COMPANYPRODUCT"){

    const product = await CompanyProducts.find({ category: { $in: genres } });
    response = product.map((event) => ({
      _id: event._id,
      name: event.name,
      firstImage: event.images[0],
      category: event.category,
      price:event.price
    }));
  }
  else{
      return res.status(201).json({
          success: false,
          message: "Give Correct Type",
        });
  }
  return res.status(200).json({
    success: true,
    response:response,
  });
  } catch (error) {
    return res.send({ success: false, error: error });
  }
});

module.exports = app;
