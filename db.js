const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/Linkfluence";
const ConnecttoMongoDB = () => {
  mongoose.connect(mongoURI).then(() => {
    console.log("MongoDB Connection Succesful!");
  });
};
module.exports = ConnecttoMongoDB;
