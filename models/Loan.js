const db = require('../config/db');

async function createLoan(
    memberId,
    amount,
    interestRate,
    issueDate,
    dueDate
) {
    const [result] = await db.query(
        `INSERT INTO loans
         (member_id, amount, interest_rate, issue_date, due_date)
         VALUES (?, ?, ?, ?, ?)`,
        [memberId, amount, interestRate, issueDate, dueDate]
    );

    return result;
}

async function getAllLoans() {
    const [rows] = await db.query(
        'SELECT * FROM loans'
    );

    return rows;
}

async function getLoanById(id) {
    const [rows] = await db.query(
        'SELECT * FROM loans WHERE id = ?',
        [id]
    );

    return rows[0];
}

async function getLoansByMember(memberId) {
    const [rows] = await db.query(
        'SELECT * FROM loans WHERE member_id = ?',
        [memberId]
    );

    return rows;
}

async function updateLoanStatus(id, status) {
    const [result] = await db.query(
        'UPDATE loans SET status = ? WHERE id = ?',
        [status, id]
    );

    return result;
}

module.exports = {
    createLoan,
    getAllLoans,
    getLoanById,
    getLoansByMember,
    updateLoanStatus
};