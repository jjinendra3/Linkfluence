const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["Company", "Influencer", "Event"],
  },
  verified: {
    type: Number,
    required: true,
    default: 0,
    enum: [-1, 0, 1], //0 is pending, -1 is rejected, 1 is approved
  },
});

module.exports = mongoose.model("User", UserSchema);
