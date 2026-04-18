const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  res.json({
    message: "Login successful",
    user
  });
});

module.exports = router;
