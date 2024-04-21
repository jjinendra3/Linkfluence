const express = require("express");
const app = express();
const Influencer = require("../models/Influencers");
const CompanyProducts = require("../models/CompanyProducts");
const Event = require("../models/Events");
const Users = require("../models/Users");
const CheckUser = require("../middleware/CheckUser");
const bcrypt=require("bcrypt");
app.get("/get/:id", CheckUser, async function (req, res) {
  if (!req.checker) {
    return res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const response = await Users.findById(req.params.id);
    response.password=null;
    return res.send({ success: true, response: response });
  } catch (error) {
    const err=error.toString();
    return res.send({ success: false, error: err });
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
    let type = req.params.type;
    if (type.toUpperCase() === "EVENT") {
      const events = await Event.find({ theme: { $in: genres } });
      response = events.map((event) => ({
        _id: event._id,
        name: event.name,
        firstImage: event.images[0],
        theme: event.theme,
        venue: event.venue,
      }));
    } else if (type.toUpperCase() === "INFLUENCER") {
      const influencers = await Influencer.find({ genre: { $in: genres } });
      response = influencers.map((event) => ({
        _id: event._id,
        name: event.name,
        firstImage: event.photo,
        genre: event.genre,
        platform: event.platform,
      }));
    } else if (type.toUpperCase() === "COMPANYPRODUCT") {
      const product = await CompanyProducts.find({ category: { $in: genres } });
      response = product.map((event) => ({
        _id: event._id,
        name: event.name,
        firstImage: event.images[0],
        category: event.category,
        price: event.price,
      }));
    } else {
      return res.status(201).json({
        success: false,
        message: "Give Correct Type",
      });
    }
    return res.status(200).json({
      success: true,
      response: response,
    });
  } catch (error) {
    return res.send({ success: false, error: error });
  }
});

app.get("/getprofile", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const users = await Users.find({ _id: req.user_id });
    const user_detail = users.length !== 0 ? users[0] : null;
    if (user_detail === null) {
      return res.send({ s: false, error: "No Such User found!" });
    }
    delete user_detail.password;
    return res.send({ success: true, response: user_detail });
  } catch (error) {
    return res.send({ success: false, error: "Not Found!" });
  }
});


app.post("/filter/:type", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const { pricerange,genre,theme,venue,category,price,selectedMonths,selectedYears,badges } = req.body;
    let query = {
      $or:[]
    };
    if(pricerange!=undefined){//influencer
      query.$or.push({pricerange:{$in:pricerange}});
    }
    if(genre!=undefined){//influencer
      query.$or.push({genre:{$in:genre}});
    }
    if(badges!=undefined){
      query.$or.push({badges:{$in:badges}});
    }
    if(theme!=undefined){//company & event
      query.$or.push({theme:{$in:theme}});
    }
    if(venue!=undefined){//event
      query.$or.push({venue:{$in:venue}});
    }
    if(category!=undefined){//company-products
      query.$or.push({category:{$in:category}});
    }
    if(price!=undefined){//company-products
      query.$or.push({price: { $gte: price.min, $lte: price.max }});
    }
    if(selectedMonths!=undefined && selectedYears!=undefined){//event
      query.$or.push({$and: [
        { months: { $in: selectedMonths } },
        { years: { $in: selectedYears } },
      ]});
    }
    let response;
    if(req.params.type.toUpperCase()==="EVENT"){
        response = await Event.find(query);
    }else if(req.params.type.toUpperCase()==="INFLUENCER"){
        response = await Influencer.find(query);
    }else if(req.params.type.toUpperCase()==="COMPANYPRODUCT"){
        response = await CompanyProducts.find(query);
    }
    return res.send({ success: true, response: response });
  } catch (error) {
    const err=error.toString();
    return res.send({ success: false, error: err });
  }
});

 app.post("updateprofile", CheckUser, async (req, res) => {
  if (!req.checker) {
    return res.status(201).json({
      success: false,
      message: "User Not Found!",
    });
  }
  try {
    const { name, email, password, phone, photo, pricerange,poc,genre } = req.body;
    password = await bcrypt.hash(password, 10);
    let user = await Users.findById(req.user_id);
    user.name = name;
    user.email = email;
    user.password = password;
    user.phone = phone;
    user.photo = photo;
    user.pricerange = pricerange;
    user.genre=genre?user.genre:genre;
    user.poc=poc?user.poc:poc;
    user.platform=platform?user.platform:platform;
    await user.save();
    return res.send({ success: true, message: "Profile Updated" });
  } catch (error) {
    const err=error.toString();
    return res.send({ success: false, error: err });
  }
 })
module.exports = app;
