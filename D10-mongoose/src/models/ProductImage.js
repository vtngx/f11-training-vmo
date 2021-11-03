const mongoose = require('mongoose')

const ProductImagesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  productId: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  },
  url: {
    type: String,
    required: true
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

module.exports = mongoose.model('ProductImages', ProductImagesSchema, "product-images")