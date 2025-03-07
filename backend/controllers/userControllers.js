const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const GenerateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, {
      expiresIn: "3d",
  });
}

// @desc    Register new user
// @route   POST /api/users/signup
// @access  Public
const signupUser = async (req, res) => {
  try {
      const {
          name,
          username,
          password,
          phone_number,
          gender,
          date_of_birth,
          membership_status,
          bio,
          address,
          profile_picture,
      } = req.body;

      if (!name || !username || !password || !phone_number || !gender || !date_of_birth || !membership_status || !address || !profile_picture) {
          res.status(400);
          throw new Error("Please add all fields");
      }

      // Check if user exists
      const userExists = await User.findOne({ username });

      if (userExists) {
          res.status(400);
          throw new Error("User already exists");
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create user
      const user = await User.create({
          name,
          username,
          password: hashedPassword,
          phone_number,
          gender,
          date_of_birth,
          membership_status,
          address,
          bio,
          profile_picture,
      });

      if (user) {
          const token = GenerateToken(user._id);
          res.status(201).json({ username, token});
      } else {
          res.status(400);
          throw new Error("Invalid user data");
      }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// @route   POST /api/users/login
// @access  Public
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    // Check for username
    const user = await User.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = GenerateToken(user._id);
      res.status(200).json({ username, token });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  signupUser,
  loginUser,
  getMe,
};
