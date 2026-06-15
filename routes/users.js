const express = require("express");
const router = express.Router();
const User = require("../models/User");
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return res.status(200).json({
      message: 'Login successful!',
      token: 'chama-session-active-token',
      user: { 
        user_id: user.user_id, 
        member_id: user.member_id, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Database Auth Error:', error);
    return res.status(500).json({ message: 'Server database error' });
  }
});

module.exports = router;