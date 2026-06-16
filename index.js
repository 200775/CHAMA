
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 
require('dotenv').config();

const app = express();
app.get('api/members', (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.use(cors({
  origin: 'https://chamaz.netlify.app' 
}));

app.use(express.json()); 
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!user || user.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const foundUser = user[0];

    // Check password (Plain text for now, use bcrypt later for production!)
    if (foundUser.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({
      message: 'Login successful!',
      token: 'mock-jwt-token-for-chama', 
      user: {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username, 
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Database server error' });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));