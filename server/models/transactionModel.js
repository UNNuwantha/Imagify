import mongoose from 'mongoose'

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  planId: { type: String, required: true },
  credits: { type: Number, required: true },
  amount: { type: Number, required: true },
  stripeSessionId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' },
}, { timestamps: true })

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', transactionSchema)

export default Transaction
