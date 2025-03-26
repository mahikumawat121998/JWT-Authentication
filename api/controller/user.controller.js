const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/authUtils.js");
const { User } = require("../model/user.model.js");

const userRegister = async (req, res) => {
  try {
    const { username, email, password, isAdmin } = req.body;
    if (!username || !email || !req.body.password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new user
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    console.log(password);
    const user = new User({ username, email, password: hashPassword, isAdmin });
    await user.save();
    return res.status(201).json({
      username,
      email,
      isAdmin,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
const userLogin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Save refresh token in the database
    await User.updateOne({ username }, { refreshToken });

    // Send response
    return res.status(200).json({
      id: user._id,
      username,
      role: user.role,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  console.log(
    "req.user.id === req.params.userId || req.user.isAdmin",
    req.user.id,
    req.params.userId,
    req.user.isAdmin
  );
  try {
    if (req.user.id === req.params.userId) {
      const userId = req.params.userId;
      console.log("userId", userId);
      const { username } = req.body;
      await User.deleteOne({ _id: userId });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

const refreshTokens = async (req, res) => {
  try {
    const refreshToken = req.body.token;
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    const decoded = jwt.decode(refreshToken);
    console.log("decoded.username", decoded.username);
    const user = await User.findOne({ username: decoded.username });
    console.log("user.username", user);
    if (user.refreshToken === refreshToken) {
      const accessToken = generateAccessToken(decoded);
      const updatedNewRefreshToken = generateRefreshToken(decoded);
      const modifiedUserToken = await User.updateOne(
        { username: decoded.username },
        { refreshToken: updatedNewRefreshToken }
      );
      if (modifiedUserToken.modifiedCount == 1) {
        return res.status(200).json({ accessToken, updatedNewRefreshToken });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

module.exports = { userRegister, userLogin, deleteUser, refreshTokens };
