
const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// GET all members
router.get('/', async (req, res) => {
  try {
    const members = await Member.getAll();
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Error retrieving members' });
  }
});

// POST a new member
router.post('/', async (req, res) => {
  const { member_id,full_name, email, phone_number, join_date } = req.body;
  
  try {
    const newMemberId = await Member.create(member_id,full_name, email, phone_number, join_date);
    res.status(201).json({ 
      message: 'Member added successfully', 
      id: newMemberId 
    });
  } catch (error) {
    console.error('Error saving member:', error);
    res.status(500).json({ message: 'Error saving member profile' });
  }
});

module.exports = router;