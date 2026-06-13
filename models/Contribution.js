const db = require('../config/db');

async function createContribution(memberId, amount) {
  const [result] = await db.query(
    'INSERT INTO contributions (member_id, amount) VALUES (?, ?)',
    [memberId, amount]
  );

  return result;
}

async function getAllContributions() {
  const [rows] = await db.query(
    'SELECT * FROM contributions'
  );

  return rows;
}

module.exports = {
  createContribution,
  getAllContributions
};