const express = require("express");
const app = express.Router();
const jwt = require("jsonwebtoken");
const uniqueness = require("../middleware/uniquecheck");
const Company = require("../models/Company");
const Influencer = require("../models/Influencers");
const Event = require("../models/EventManagement");
const bcrypt = require("bcrypt");
const Users = require("../models/Users");
const Followers = require("../middleware/Followers");
const saltRounds = 10;
function ValidateEmail(mail) {
  // eslint-disable-next-line
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return false;
  }
  return true;
}
app.post("/signup", uniqueness, Followers, async (req, res) => {
  if (req.error) {
    return res.send({
      success: false,
      msg: "Platform verification error.",
    });
  }
  if (!req.checker) {
    return res.send({
      success: false,
      msg: "User already exists using phone/mail.",
    });
  } else {
    try {
      let obj = req.body;
      const type = obj.type;
      delete obj.type;
      if (ValidateEmail(req.body.email)) {
        return res.send({ success: false, msg: "Write correct mail format" });
      }
      obj.password = await bcrypt.hash(obj.password, saltRounds);
      if (type === "Company") {
        await Company.create(obj);
      } else if (type === "Event") {
        await Event.create(obj);
      } else {
        let platformstr = "platform";
        obj[platformstr] = req.platform;
        await Influencer.create(obj);
      }
      return res.send({ success: true, msg: "Succesful" });
    } catch (error) {
      return res.send({ success: false, msg: error });
    }
  }
});

app.post("/login", async (req, res) => {
  try {
    const { id, pw } = req.body;
    const users = await Users.find({ $or: [{ email: id }, { phone: id }] });
    const user_detail = users.length !== 0 ? users[0] : null;
    if (user_detail === null) {
      return res.send({ s: false, error: "No Such User found!" });
    }
    const comparing = await bcrypt.compare(pw, user_detail.password);
    if (!comparing) {
      return res.send({ success: false, error: "Credentials do not match!" });
    }
    let obj = user_detail;
    let st = user_detail._id.toString();
    obj.key = st;
    let privateKey = "YOUR_PRIVATE_KEY";
    let oobj = {
      key: obj.key,
      type: obj.__t,
    };
    const token = await jwt.sign(oobj, privateKey);
    return res.send({ success: true, token, obj });
  } catch (error) {
    return res.send({ success: false, error: "Please try Again later!" });
  }
});
module.exports = app;
