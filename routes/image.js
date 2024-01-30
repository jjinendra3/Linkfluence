const express = require("express");
const app = express.Router();
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

app.post("/uploadimage", upload.array("images"), async function (req, res) {
  try {
    const datetime = giveCurrentDateTime();
    const array = [];
    for (i in req.files) {
      const storageRef = ref(
        storage,
        `files/${req.files[i].originalname + " " + datetime}`,
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
    return res.send({
      success: true,
      message: "Image/Logo uploaded to firebase storage",
      image: array,
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
