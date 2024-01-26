const express = require("express");
const ConnecttoMongoDB = require("./db");
const app = express();
const cors = require("cors");
ConnecttoMongoDB();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.listen(5000, () => {
  console.log("HiChat");
});
