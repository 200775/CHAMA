const mongoose = require('mongoose')

const ContributionSchema = new mongoose.Schema({
  memberId:   { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  amount:     { type: Number, required: true },
  month:      { type: String, required: true },
  datePaid:   { type: Date, default: Date.now },
  status:     { type: String, enum: ['paid', 'pending'], default: 'paid' },
  recordedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Member' }
})

module.exports = mongoose.model('Contribution', ContributionSchema)