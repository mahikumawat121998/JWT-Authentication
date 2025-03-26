const jwt = require("jsonwebtoken");
const generateAccessToken = (params) => {
  console.log("Generating access", params);
  const { _id, username, role, isAdmin } = params;
  const accessToken = jwt.sign(
    { id: _id, username, role, isAdmin },
    "access_token_secret_key",
    {
      expiresIn: "1h",
    }
  );
  console.log("access", accessToken);
  return accessToken;
};
const generateRefreshToken = (params) => {
  const { username, role, isAdmin } = params;
  const refreshToken = jwt.sign(
    { username, role, isAdmin },
    "refresh_token_secret_key"
  );
  return refreshToken;
};

module.exports = { generateAccessToken, generateRefreshToken };
