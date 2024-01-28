const express = require("express");
const app = express.Router();
const CompanyProducts = require("../models/CompanyProducts");
const Company = require("../models/Company");
const initializeApp = require("firebase/app").initializeApp;
const getStorage = require("firebase/storage").getStorage;
const ref = require("firebase/storage").ref;
const uploadBytesResumable = require("firebase/storage").uploadBytesResumable;
const getDownloadURL = require("firebase/storage").getDownloadURL;
const multer = require("multer");
const config = require("../config");
initializeApp(config);
const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

app.post("/uploadimage", upload.array("images"), async (req, res) => {
  try {
    const { name, desc, price, categories, userid } = req.body;
    const dateTime = giveCurrentDateTime();
    const array = [];
    for (i in req.files) {
      const storageRef = ref(
        storage,
        `files/${req.files[i].originalname + " " + dateTime}`,
      );
      const metadata = {
        contentType: req.files[i].mimetype,
      };
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.files[i].buffer,
        metadata,
      );
      const downloadURL = await getDownloadURL(snapshot.ref);
      array.push(downloadURL);
    }
    let pricer = parseInt(price);
    const adder = await CompanyProducts.create({
      name: name,
      desc: desc,
      price: price,
      categories: categories,
      images: array,
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

const giveCurrentDateTime = () => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const dateTime = date + " " + time;
  return dateTime;
};

module.exports = app;
