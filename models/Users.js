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
  photo: {
    type: String,
    default:
      "https://t3.ftcdn.net/jpg/05/53/79/60/360_F_553796090_XHrE6R9jwmBJUMo9HKl41hyHJ5gqt9oz.jpg",
  },
  pricerange: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  badges: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
    default: 1, //basically novice if 1, then every 3 contracts thru the app, they will be promoted
  },
});

module.exports = mongoose.model("User", UserSchema);
