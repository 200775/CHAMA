const express = require('express')
const router = express.Router()
const Member = require('../models/Member')

// GET all members
router.get('/', async (req, res) => {
  const members = await Member.find().select('-password')
  res.json(members)
})

// POST add member
router.post('/', async (req, res) => {
  try {
    const member = new Member(req.body)
    await member.save()
    res.status(201).json(member)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// DELETE member
router.delete('/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id)
  res.json({ message: 'Member deleted' })
})

module.exports = router