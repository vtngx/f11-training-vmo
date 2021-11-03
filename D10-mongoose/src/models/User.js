const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'username is requried'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    select: false
  },
  age: {
    type: Number,
    required: [true, 'age is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'email invalid'
    ],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
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

//  encrypt password
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password'))
    next()

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

//  sign jwt
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXP }
  )
}

//  check password match
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model('User', UserSchema, "users")