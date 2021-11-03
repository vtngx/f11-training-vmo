const mongoose = require('mongoose')

const CustomerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentMethod: {
    type: Number,
  },
  isActive: {
    type: Number,
    enum: [0, 1],
    default: 1
  },
  isDeleted: {
    type: Number,
    enum: [0, 1],
    default: 0
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedBy: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    default: null
  },
  updatedAt: {
    type: Date,
    default: null
  }
})

module.exports = mongoose.model('Customer', CustomerSchema, "customers")