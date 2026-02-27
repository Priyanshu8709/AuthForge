const express = require("express");
const router = express.Router();

const { login, signup, verifySignupOTP, verifyLoginOTP, logout, forgotPassword, resetPassword } = require("../controllers/Auth.js");
const { auth } = require("../middlewares/auth.js");
const { getProfile } = require("../controllers/getProfile.js");

// Public routes
router.post("/signup", signup);
router.post("/verify-signup", verifySignupOTP);

router.post("/login", login);
router.post("/verify-login", verifyLoginOTP);
router.post("/logout", logout);

// password recovery
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// Protected route
router.get("/profile", auth, getProfile);

module.exports = router;
