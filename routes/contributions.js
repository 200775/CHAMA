const express = require('express')
const router = express.Router()
const Contribution = require('../models/Contribution')

// GET all contributions
router.get('/', async (req, res) => {
  const contributions = await Contribution.find().populate('memberId', 'name email')
  res.json(contributions)
})

// GET contributions by member
router.get('/member/:memberId', async (req, res) => {
  const contributions = await Contribution.find({ memberId: req.params.memberId })
  res.json(contributions)
})

// POST record contribution
router.post('/', async (req, res) => {
  try {
    const contribution = new Contribution(req.body)
    await contribution.save()
    res.status(201).json(contribution)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// GET total contributions
router.get('/total', async (req, res) => {
  const result = await Contribution.aggregate([
    { $match: { status: 'paid' } },
    { $group: { _id: null, total: { $sum: '$amount' } } }
  ])
  res.json({ total: result[0]?.total || 0 })
})

module.exports = router