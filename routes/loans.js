const express = require('express')
const router = express.Router()
const Loan = require('../models/Loan')

// GET all loans
router.get('/', async (req, res) => {
  const loans = await Loan.find().populate('memberId', 'name email')
  res.json(loans)
})

// POST request loan
router.post('/', async (req, res) => {
  try {
    const loan = new Loan(req.body)
    await loan.save()
    res.status(201).json(loan)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// PUT approve loan
router.put('/:id/approve', async (req, res) => {
  const loan = await Loan.findByIdAndUpdate(
    req.params.id,
    { status: 'approved', approvedDate: Date.now() },
    { new: true }
  )
  res.json(loan)
})

// PUT repay loan
router.put('/:id/repay', async (req, res) => {
  const loan = await Loan.findById(req.params.id)
  loan.amountPaid += req.body.amount
  loan.balance = loan.totalRepayable - loan.amountPaid
  loan.status = loan.balance <= 0 ? 'completed' : 'repaying'
  await loan.save()
  res.json(loan)
})

module.exports = router