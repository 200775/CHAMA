const db = require('../config/db');

const Loan = {
  getAll: async () => {
    const query = `
      SELECT l.*, m.full_name 
      FROM loans l
      JOIN members m ON l.member_id = m.member_id
      ORDER BY l.loan_id DESC
    `;
    const [rows] = await db.query(query);
    return rows;
  },

  // Insert a new loan application into the database
  create: async (member_id, amount, status) => {
    const [result] = await db.query(
      'INSERT INTO loans (member_id, amount, status, request_date) VALUES (?, ?, ?, NOW())',
      [member_id, amount, status || 'Submitted']
    );
    return result.insertId;
  }
};

module.exports = Loan;
