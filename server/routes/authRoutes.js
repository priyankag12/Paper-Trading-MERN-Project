const express = require("express");
const {
  register,
  login,
  getProfile,
  updateProfile,
  deleteProfile,
  forgotPassword,
  resetPassword,
  confirmPassword,
  // confirmPassword,
} = require("../controllers/authController.js");
const { protect } = require("../middleware/authMiddleware.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgotpassword", forgotPassword);
router.get("/resetpassword/:id/:token", resetPassword);
router.post("/confirmpassword/:id/:token", confirmPassword);
router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/profile", protect, deleteProfile);

module.exports = router;
