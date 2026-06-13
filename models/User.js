const db = require('../config/db'); // Import the database pool

async function createUser(name, email, password) {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );

  return result;
}

async function getUserByEmail(email) {
  const [rows] = await db.query(
    'SELECT * FROM users WHERE email = ?',
    [email]
  );

  return rows[0];
}

module.exports = {
  createUser,
  getUserByEmail
};o