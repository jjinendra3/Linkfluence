const jwt = require("jsonwebtoken");
const CheckUser = async (req, res, next) => {
  let header = req.header("auth-token");
  let privateKey = "YOUR_PRIVATE_KEY";
  await jwt.verify(header, privateKey, function (err, decoded) {
    if (err) {
      req.checker = 0;
      return;
    }
    req.user_id = decoded.key;
    req.type = decoded.type;
    req.checker = 1;
    return;
  });
  next();
};
module.exports = CheckUser;
