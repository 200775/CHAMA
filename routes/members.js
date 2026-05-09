
const express = require("express");
const router = express.Router();
const Member = require("../models/Member");

// GET all
router.get("/", async (req, res) => {
  const members = await Member.find().select("-password");
  res.json(members);
});

// CREATE
router.post("/", async (req, res) => {
  const member = await Member.create(req.body);
  res.json(member);
});

// DELETE
router.delete("/:id", async (req, res) => {
  await Member.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;
router.delete('/:id', async (req, res) => {
  await Member.findByIdAndDelete(req.params.id)
  res.json({ message: 'Member deleted' })
})

module.exports = router;
