const mongoose = require("mongoose");
const Users = require("./Users");
const { Schema } = mongoose;

const InfluencerSchema = Users.discriminator(
  "Influencer",
  new Schema({
    platform: {
      type: Map, //many platforms, name of platform and link /username
      required: true,
      default: { defaultPlatform: "defaultHandle" },
    },
    genre: {
      type: String,
      required: true,
    },
  }),
);
module.exports = mongoose.model("Influencer");
