const User = require("../models/Users");
const checker = async (req, res, next) => {
  const { phone, email } = req.body;
  try {
    let user_mail = await User.findOne({ email: email });
    let user_phone = await User.findOne({ phone: phone });
    if (user_mail || user_phone) {
      req.checker = 1;
    } else {
      req.checker = 0;
    }
  } catch (error) {
    req.checker = 1;
  }
  next();
};
module.exports = checker;
