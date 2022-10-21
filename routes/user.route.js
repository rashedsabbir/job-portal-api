const express = require("express");
const {
  signupUser,
  verifyUser,
  loginUser,
  getMe,
} = require("../controllers/user.controller");
const verifyToken = require("../middleware/verifyToken");
const router = express.Router();

router.post("/signup", signupUser);
router.get("/signup/confirmation/:token", verifyUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getMe);

module.exports = router;