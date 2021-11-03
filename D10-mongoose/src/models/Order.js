const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
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

module.exports = mongoose.model('Order', OrderSchema, "orders")