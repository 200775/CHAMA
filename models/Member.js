const db = require('../config/db');

async function createMember(fullName, phone, email, joinDate) {
    const [result] = await db.query(
        `INSERT INTO members
         (full_name, phone, email, join_date)
         VALUES (?, ?, ?, ?)`,
        [fullName, phone, email, joinDate]
    );

    return result;
}

async function getAllMembers() {
    const [rows] = await db.query(
        'SELECT * FROM members'
    );

    return rows;
}

async function getMemberById(id) {
    const [rows] = await db.query(
        'SELECT * FROM members WHERE id = ?',
        [id]
    );

    return rows[0];
}

async function updateMember(id, fullName, phone, email) {
    const [result] = await db.query(
        `UPDATE members
         SET full_name = ?, phone = ?, email = ?
         WHERE id = ?`,
        [fullName, phone, email, id]
    );

    return result;
}

async function deleteMember(id) {
    const [result] = await db.query(
        'DELETE FROM members WHERE id = ?',
        [id]
    );

    return result;
}

module.exports = {
    createMember,
    getAllMembers,
    getMemberById,
    updateMember,
    deleteMember
};