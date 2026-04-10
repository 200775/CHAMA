const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  phone:    { type: String, required: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['admin', 'member'], default: 'member' },
  status:   { type: String, enum: ['active', 'inactive'], default: 'active' },
  joinDate: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Member', MemberSchema)