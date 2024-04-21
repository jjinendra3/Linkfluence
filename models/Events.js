const mongoose = require("mongoose");
const { Schema } = mongoose;

const Events = new Schema({
  name: {
    type: String,
    required: true,
  },
  datetime: {
    type: Map, //date:time because often its like 13th march till 5pm and 14 march till 2pm
    required: true,
  },
  theme: {
    type: String,
    required: true,
    enum: ["Technology", "Comedy", "Music", "Food Festival"],
  },
  venue: {
    type: String,
    required: true,
  },
  venuelink: {
    type: String, //please check whether this is a valid google maps link
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  userid: {
    type: String,
    required: true,
  },
  months: {
    type: Array,
    required: true,
  },
  years: {
    type: Array,
    required: true,
  },
  images: {
    type: Array,
    required: true,
    default: ["init"],
  },
  desc: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Events", Events);
