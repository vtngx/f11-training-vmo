const mongoose = require('mongoose')
const User = require('../models/User')
const ObjectId = mongoose.Types.ObjectId
const { omit, orderBy } = require('lodash')
const generator = require('generate-password')
const Customer = require('../models/Customer')
const UserError = require('../utils/userError')
const { sendMail } = require('../utils/functions')

const getUsers = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const users = await User.aggregate([
      { $match: { isDeleted: 0 } },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "userId",
          as: "customer"
        }
      },
      { $skip: skip },
      { $limit: limit },
    ])

    return orderBy(users, ['username'],[sort])
  } catch(e) {
    return new UserError
  }
}

const getUser = async (_id) => {
  try {
    const user = await User.aggregate([
      { $match: 
        { $and: [
            { _id: ObjectId(_id) },
            { isDeleted: 0 }
          ]
        }
      },
      {
        $lookup: {
          from: "customers",
          localField: "_id",
          foreignField: "userId",
          as: "customer"
        }
      }
    ])

    return !!user.length
      ? user[0]
      : new UserError(404, "User Not Found")
  } catch(e) {
    return new UserError
  }
}

const createUser = async(body, reqUser) => {
  try {
    let data

    const exists = await User.findOne({
      isDeleted: 0,
      username: body.username
    })

    if (exists)
      return new UserError(401, "User already exists")
    
    // generate random password
    const password = generator.generate({
      length: 8,
      numbers: true
    })

    const session = await mongoose.startSession()

    await session.withTransaction(async () => {
      // create user
      const user = await User.create(
        [{
          ...omit(body, ['customer', 'password']),
          password,
          createdBy: reqUser._id
        }],
        { session }
      )

      // create customer      
      const customer = await Customer.create(
        [{
          ...body.customer,
          userId: user[0]._id,
          createdBy: reqUser._id
        }],
        { session }
      )

      data = {
        ...omit(user[0]._doc, ['password']),
        customer: customer[0]
      }
    })

    session.endSession()

    // send mail to user
    sendMail({
      type: "user",
      to: data.email,
      username: data.username,
      password
    })

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

const updateUser = async(_id, body, reqUser) => {
  try {
    let data

    // check user existence
    const [user, customer] = await Promise.all([
      User.findOne({ _id, isDeleted: 0 }),
      Customer.findOne({ userId: _id, isDeleted: 0 })
    ])
    
    if (!user || !customer)
      return new UserError(404, "User Not Found")
    
    if (user.username !== body.username || user.email !== body.email)
      return new UserError(401, "Cannot update username or email")
    
    // start transaction
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // update user
      user.set({
        ...omit(body, ['customer']),
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await user.save({ session })

      // update customer      
      customer.set({
        ...body.customer,
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await customer.save({ session })

      data = {
        ...omit(user._doc, ['password']),
        customer
      }
    })

    session.endSession()

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

const setActive = async(_id, isActive, reqUser) => {
  try {
    let data

    // check user existence
    const [user, customer] = await Promise.all([
      User.findOne({ _id, isDeleted: 0 }),
      Customer.findOne({ userId: _id, isDeleted: 0 })
    ])
    
    if (!user || !customer)
      return new UserError(404, "User Not Found")
    
    // start transaction
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // update user
      user.set({
        isActive,
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await user.save()

      // update customer      
      customer.set({
        isActive,
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await customer.save()

      data = {
        ...omit(user._doc, ['password']),
        customer
      }
    })

    session.endSession()

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  setActive,
}