const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const uniqueness = require("../middleware/uniquecheck");
const Company = require("../models/Company");
const Influencer = require("../models/Influencers");
const Event = require("../models/EventManagement");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const saltRounds = 10;

app.post("/signup", uniqueness, async (req, res) => {
  if (req.checker) {
    return res
      .status(401)
      .send("User with this email or phone number already exists!");
  } else {
    try {
      let obj = req.body;
      await bcrypt.hash(obj.password, saltRounds, async function (err, hash) {
        if (err) {
          throw res.send("error");
        } else {
          obj.password = hash;
          if (obj.type === "Company") {
            await Company.create(obj);
          } else if (obj.type === "Event") {
            await Event.create(obj);
          } else {
            await Influencer.create(obj);
          }
        }
      });
      return res.send("Sucessful");
    } catch (error) {
      console.log(error);
      return res.send("error");
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { id, pw } = req.body;
    const users = await Users.find({ $or: [{ email: id }, { phone: id }] });
    const user_detail = users.length !== 0 ? users[0] : null;
    if (user_detail === null) {
      throw res.send({ s: false, error: "No Such User found!" });
    }
    bcrypt.compare(pw, user_detail.password, async function (err, result) {
      if (err) {
        return res.send({ s: false, error: "Please Try again later!" });
      }
      if (!result) {
        return res.send({ s: false, error: "Credentials do not match!" });
      }
      let obj = user_detail;
      let st = user_detail._id.toString();
      obj.key = st;
      let privateKey = "YOUR_PRIVATE_KEY";
      jwt.sign(obj.key, privateKey, async function (err, token) {
        if (err) {
          return res.send({ s: false, error: "Please try Again later!" });
        }
        return res.send({ s: true, token, obj });
      });
    });
  } catch (error) {
    return error;
  }
});
module.exports = app;
