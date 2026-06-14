/*
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // Import the database pool
require('dotenv').config();

const app = express();
app.get('/members', (req, res) => {
  db.query('SELECT * FROM members', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

app.use(cors());
app.use(express.json()); 
async function testConnection() {
    try {
        const connection = await db.getConnection();
        console.log('✅ Connected to MySQL database successfully.');
        connection.release(); 
    } catch (error) {
        console.error('❌ Database connection failed!');
        console.error('Error Details:', error.message);
    }
}

testConnection();

// Simple default route
app.get('/', (req, res) => {
    res.send('Chamaz API Backend is running...');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
}); */
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); 
require('dotenv').config();

const app = express();
app.get('/members', (req, res) => {
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