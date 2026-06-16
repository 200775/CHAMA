const express = require('express')
const router = express.Router()
const Loan = require('../models/Loan')

router.get('/', async (req, res) => {
  try {
    const loans = await Loan.getAll();
    res.status(200).json(loans);
  } catch (error) {
    console.error('Fetch Loans Error:', error);
    res.status(500).json({ message: 'Error retrieving loan ledger accounts' });
  }
});

// POST: Process a new loan request application
router.post('/', async (req, res) => {
  const { member_id, amount, status } = req.body;
  
  if (!member_id || !amount) {
    return res.status(400).json({ message: 'Missing required member ID or amount parameters' });
  }

  try {
    const newLoanId = await Loan.create(member_id, amount, status);
    res.status(201).json({ 
      message: 'Loan request processed successfully', 
      loan_id: newLoanId 
    });
  } catch (error) {
    console.error('Create Loan Error:', error);
    res.status(500).json({ message: 'Database failed to register loan application' });
  }
});

module.exports = router;