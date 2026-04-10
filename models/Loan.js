const mongoose = require('mongoose')

const LoanSchema = new mongoose.Schema({
  memberId:      { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true },
  amount:        { type: Number, required: true },
  interest:      { type: Number, default: 10 },
  totalRepayable:{ type: Number },
  amountPaid:    { type: Number, default: 0 },
  balance:       { type: Number },
  status:        { type: String, enum: ['pending', 'approved', 'repaying', 'completed'], default: 'pending' },
  requestDate:   { type: Date, default: Date.now },
  approvedDate:  { type: Date },
  dueDate:       { type: Date }
})

// Auto calculate total repayable and balance before saving
LoanSchema.pre('save', function(next) {
  this.totalRepayable = this.amount + (this.amount * this.interest / 100)
  this.balance = this.totalRepayable - this.amountPaid
  next()
})

module.exports = mongoose.model('Loan', LoanSchema)