const User = require("../models/Users");
const checker = async (req, res, next) => {
  const { phone, email } = req.body;
  try {
    const users = await User.find({
      $or: [{ email: email }, { phone: phone }],
    });
    if (users.length !== 0) {
      req.checker = 0;
    } else {
      req.checker = 1;
    }
  } catch (error) {
    req.checker = 1;
  }
  next();
};
module.exports = checker;
