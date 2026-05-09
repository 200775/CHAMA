<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const User = require("../config/mongo");
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
=======
const express = require("express");
const router = express.Router();
const User = require("../config/mongo");

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
>>>>>>> 93c28912e91cce27073d9b5b411a6f452c8722b0
