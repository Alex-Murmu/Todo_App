const express = require("express");
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware");
const router = express.Router();


//Auth Routes

router.post("/register",registerUser); // Register User
router.post("/login",loginUser) ;               // ogin user
router.get("/profile",protect,getUserProfile);  // get User Profile;
router.put("/profile",protect,updateUserProfile);  // update User Profile;

module.exports = router;