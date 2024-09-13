const authController = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const getToken = require("../services/getToken");
const dotenv = require("dotenv").config;

const expIn = 1000 * 60 * 60; // 1 hour in milliseconds

authController.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password fields are required",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email already in use, choose another" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ name, email, password: hashedPassword });
    const savedUser = await newUser.save();

    // Generate JWT token
    // const token = await getToken({ email: email }, expIn);

    res.json({
      status: true,
      message: "User registered successfully!",
      _id: savedUser._id,
      user: savedUser.email,
    });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = authController;
