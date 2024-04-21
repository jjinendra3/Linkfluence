const express = require("express");
require("dotenv").config();
const ConnecttoMongoDB = require("./db");
const app = express();
const cors = require("cors");
ConnecttoMongoDB();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/companies", require("./routes/companies"));
app.use("/events", require("./routes/event"));
app.use("/image", require("./routes/image"));
app.use("/common", require("./routes/common"));
app.listen(5000, () => {
  console.log("Linkfluence");
});
