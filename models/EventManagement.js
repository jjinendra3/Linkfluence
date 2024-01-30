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
    prev_event_link: {
      type: String, //if first timer then make them write First Event otherwise we need the link of the prev event hosted
      //i think we will have to check it manually for now
      required: true,
    },
    events_id: {
      type: Array,
      default: ["init"],
    },
    influencercontracts: {
      type: Array,
      of: String,
      default: ["init"],
      required: true,
    },
    companycontracts: {
      type: Array,
      of: String,
      default: ["init"],
      required: true,
    },
  }),
);
module.exports = mongoose.model("Event");
