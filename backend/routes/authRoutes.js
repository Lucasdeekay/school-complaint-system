// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require("../middleware/auth");

router.post("/register", authController.register);
router.post("/register-admin", authController.registerAdmin);
router.post("/login", authController.login);
router.post("/change-password", verifyToken, authController.changePassword);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);

module.exports = router;
