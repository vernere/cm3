const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middleware/customMiddleware");

const { loginUser, signupUser, getMe } = require("../controllers/userControllers");
  
// login route
router.post("/login", loginUser);
  
// signup route
router.post("/signup", signupUser);

router.get("/getMe", requireAuth, getMe)
  
module.exports = router;