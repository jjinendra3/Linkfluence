const mongoose = require("mongoose");
const Users = require("./Users");
const { Schema } = mongoose;

const EventManagementSchema = Users.discriminator(
  "Event",
  new Schema({
    poc: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  }),
);
module.exports = mongoose.model("Event");
