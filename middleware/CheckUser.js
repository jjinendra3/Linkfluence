const jwt = require("jsonwebtoken");

const CheckUser = async (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      return res.status(401).json({ success:0, error: "Unauthorized: Token missing" });
    }
    const privateKey = "YOUR_PRIVATE_KEY";
    const decodedToken = await jwt.verify(token, privateKey);
    req.user_id = decodedToken.key;
    req.type = decodedToken.type;
    req.checker = 1;
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    req.checker = 0;
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = CheckUser;
