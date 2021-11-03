const { omit } = require('lodash')
const mongoose = require('mongoose')
const { Promise } = require('bluebird')
const Order = require('../models/Order')
const ObjectId = mongoose.Types.ObjectId
const Customer = require('../models/Customer')
const UserError = require('../utils/userError')
const { sendMail } = require('../utils/functions')
const OrderDetails = require('../models/OrderDetail')

const getOrders = async query => {
  try {
    let { page, limit } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const orders = await Order.aggregate([
      { $match: { isDeleted: 0 } },
      {
        $lookup: {
          from: "order-details",
          localField: "_id",
          foreignField: "orderId",
          as: "orderDetails",
        }
      },
      {
        $unwind: {
          path: "$orderDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "orderDetails.productId",
          foreignField: "_id",
          as: "orderDetails.products",
        }
      },
      {
        $unwind: {
          path: "$orderDetails.products"
        }
      },
      {
        $lookup: {
          from: "product-images",
          localField: "orderDetails.products._id",
          foreignField: "productId",
          as: "orderDetails.products.images",
        }
      },
      { $skip: skip },
      { $limit: limit },
    ])

    return orders
  } catch(e) {
    return new UserError
  }
}

const getOrder = async _id => {
  try {
    const order = await Order.aggregate([
      { $match: 
        { $and: [
            { _id: ObjectId(_id) },
            { isDeleted: 0 }
          ]
        }
      },
      {
        $lookup: {
          from: "order-details",
          localField: "_id",
          foreignField: "orderId",
          as: "orderDetails",
        }
      },
      {
        $unwind: {
          path: "$orderDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "orderDetails.productId",
          foreignField: "_id",
          as: "orderDetails.products",
        }
      },
      {
        $unwind: {
          path: "$orderDetails.products"
        }
      },
      {
        $lookup: {
          from: "product-images",
          localField: "orderDetails.products._id",
          foreignField: "productId",
          as: "orderDetails.products.images",
        }
      },
    ])

    return !!order.length
      ? order[0]
      : new UserError(404, "Order Not Found")
  } catch(e) {
    return new UserError
  }
}

const createOrder = async(body, reqUser) => {
  try {
    let data

    //  validate orderDetails 
    if(body.orderDetails.length === 0)
      return new UserError(401, "orderDetails cannot be blank")

    //  validate customerId
    const customer = await Customer
      .findOne({
        _id: body.customerId,
        isDeleted: 0
      })
      .populate('userId')

    if (!customer)
      return new UserError(401, "Invalid customerId")      
    
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {  
      // create order
      const items = body.orderDetails
      
      const order = await Order.create(
        [{
          ...omit(body, ['orderDetails']),
          price: items
            .map(i => i.price)
            .reduce((a, b) => a+b),
          tax: items
            .map(i => i.tax)
            .reduce((a, b) => a+b),
          discount: items
            .map(i => i.discount)
            .reduce((a, b) => a+b),
          totalPrice: items
            .map(i => i.price + i.tax - i.discount)
            .reduce((a, b) => a+b),
          createdBy: reqUser._id
        }],
        { session }
      )

      // create orderDetails      
      const orderDetails = await OrderDetails.create(
        [...items.map(item => {
          return {
            ...item,
            orderId: order[0]._id,
            totalPrice: item.price + item.tax - item.discount,
            createdBy: reqUser._id
          }
        })],
        { session }
      )

      data = {
        ...order[0]._doc,
        orderDetails
      }
    })

    session.endSession()

    // send mail to user
    sendMail({
      type: "order",
      to: customer.userId.email,
      username: customer.userId.username,
      orderId: data._id
    })

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

const updateOrder = async(_id, body, reqUser) => {
  try {
    let data

    // check order existence
    const [order, orderDetails] = await Promise.all([
      Order.findOne({ _id, isDeleted: 0 }),
      OrderDetails.find({ orderId: _id, isDeleted: 0 })
    ])
    
    if (!order || !orderDetails.length)
      return new UserError(404, "Order Not Found")
    
    if (!body.orderDetails.length)
      return new UserError(401, "orderDetails cannot be blank")
    
    // start transaction
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      const items = body.orderDetails

      // update order
      order.set({
        ...omit(body, ['orderDetails']),
        price: items
          .map(i => i.price)
          .reduce((a, b) => a+b),
        tax: items
          .map(i => i.tax)
          .reduce((a, b) => a+b),
        discount: items
          .map(i => i.discount)
          .reduce((a, b) => a+b),
        totalPrice: items
          .map(i => i.price + i.tax - i.discount)
          .reduce((a, b) => a+b),
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await order.save({ session })

      // remove old orderDetails
      await OrderDetails
        .deleteMany({ _id: { $in: orderDetails.map(i => i._id) } })
        .session(session)

      // re-create orderDetails
      const newDetails = await OrderDetails.create(
        [...items.map(item => {
          return {
            ...item,
            orderId: order._id,
            totalPrice: item.price + item.tax - item.discount,
            createdBy: order.createdBy,
            createdAt: order.createdAt,
            updatedBy: reqUser._id,
            updatedAt: Date.now()
          }
        })],
        { session }
      )

      data = {
        ...order._doc,
        orderDetails: newDetails
      }
    })

    session.endSession()

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

const deleteOrder = async (_id, reqUser) => {
  try {
    // check order existence
    const [order, orderDetails] = await Promise.all([
      Order.findOne({ _id, isDeleted: 0 }),
      OrderDetails.find({ orderId: _id, isDeleted: 0 })
    ])
    
    if (!order || !orderDetails.length)
      return new UserError(404, "Order Not Found")
    
    // start transaction
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // update order
      order.set({
        isDeleted: 1,
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await order.save({ session })

      // update orderDetails
      await Promise.map(orderDetails, async item => {
        item.set({
          ...item,
          isDeleted: 1,
          updatedBy: reqUser._id,
          updatedAt: Date.now()
        })
        await item.save({ session })
      })

      return true
    })

    session.endSession()

    return true
  } catch(e) {
    return new UserError
  }
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
}