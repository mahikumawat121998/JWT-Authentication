const jwt = require("jsonwebtoken");
const verify = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "access_token_secret_key", (err, user) => {
      if (err) {
        return res.status(403).json({ message: err });
      }
      console.log("user", user);
      req.user = user;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "You are not authenticated!" });
  }
};

module.exports = { verify };
