const mongoose = require("mongoose");
const Users = require("./Users");
const { Schema } = mongoose;
const Genres = [
  "Fashion",
  "Fitness",
  "Travel",
  "Beauty",
  "Gaming",
  "Food",
  "Lifestyle",
  "Technology",
  "Comedy",
  "Music",
  "Health",
  "DIY",
  "Sports",
];
const InfluencerSchema = Users.discriminator(
  "Influencer",
  new Schema({
    platform: {
      type: Map, // many platforms, link:number of followers
      required: true,
    },
    genre: {
      type: String,
      required: true,
      enum: Genres,
    },
    companycontracts: {
      type: Array,
      of: String,
      default: ["init"],
      required: true,
    },
    eventcontracts: {
      type: Array,
      of: String,
      default: ["init"],
      required: true,
    },
  }),
);
module.exports = mongoose.model("Influencer");
