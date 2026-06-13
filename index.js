
app.use(express.static('Frontend'));
app.use('/users',         require('./routes/users'))
app.use('/members',       require('./routes/members'))
app.use('/contributions', require('./routes/contributions'))
app.use('/loans',         require('./routes/loans')) 
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
});
