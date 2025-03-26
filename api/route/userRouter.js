const express = require("express");
const { verify } = require("../middleware/auth.middleware.js");
const router = express.Router();
const {
  getUser,
  userRegister,
  userLogin,
  deleteUser,
  refreshTokens
} = require("../controller/user.controller.js");

router.post("/", userRegister);
router.post("/login", userLogin);
router.delete("/delete/:userId", verify, deleteUser);
router.post("/refresh", refreshTokens);

module.exports = router;
