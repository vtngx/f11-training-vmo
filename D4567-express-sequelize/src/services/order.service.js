const {
  Order,
  OrderDetail,
  sequelize,
} = require('../models')
const { omit } = require('lodash')
const { Promise } = require('bluebird')
const UserError = require('../utils/userError')

const getOrders = async () => {
  try {
    const orders = await Order.findAll({
      include: {
        model: OrderDetail,
        as: 'orderDetails'
      }
    })
    return orders
  } catch (err) {
    return new UserError
  }
}

const getSingleOrder = async (where) => {
  try {
    const order = await Order.findOne({
      where,
      include: {
        model: OrderDetail,
        as: 'orderDetails'
      }
    })
    return order || new UserError(404, "Not Found")
  } catch (err) {
    return new UserError
  }
}

const createOrder = async (body) => {
  try {    
    const data = await sequelize.transaction(async (t) => {
      // create order
      const order = await Order.create(
        { ...omit(body, [ 'orderDetails' ]) },
        { transaction: t }
      )

      // create orderDetails
      const orderDetails = body.orderDetails.length
        ? await OrderDetail.bulkCreate(
          [...body.orderDetails.map(i => ({ ...i, orderId: order.id }))],
          { transaction: t }
        )
        : []

      return {
        ...order.dataValues,
        orderDetails
      }
    })

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

const updateOrder = async (where, body) => {
  try {
    const order = await Order.findOne({ where })
    
    if (!order)
      return new UserError(404, "Order Not Found")
    
    const updateData = await sequelize.transaction(async (t) => {
      // update order
      order.set({ ...omit(body, [ 'orderDetails' ]) })
      await order.save({ transaction: t })

      const ids = body.orderDetails.length
        ? body.orderDetails.map(item => item.id)
        : []

      //  delete old orderDetails 
      await OrderDetail.destroy(
        { where: { id: ids } },
        { transaction: t }
      )
      
      // re-create orderDetails if there's orderDetails in body
      if (ids.length)
        await Promise.map(body.orderDetails, item => {
          return OrderDetail.create(
            { ...omit(item, [ 'id' ]) },
            { transaction: t }
          )
        })

      return {
        ...order.dataValues,
        orderDetails: body.orderDetails
      }
    })

    return updateData || new UserError
  } catch(e) {
    return new UserError
  }
}

const deleteOrder = async (where) => {
  try {
    const order = await Order.findOne({
      where,
      include: {
        model: OrderDetail,
        as: 'orderDetails'
      }
    })
    
    if (!order)
      return new UserError(404, "Order Not Found")
    
    const data = await sequelize.transaction(async (t) => {
      // delete orderDetails
      if (order.orderDetails.length)
        await OrderDetail.destroy(
          { where: { id: order.orderDetails.map(i => i.id) } },
          { transaction: t }
        )

      // delete order
      await Order.destroy(
        { where },
        { transaction: t }
      )

      return true
    })

    return data
  } catch(e) {
    return new UserError
  }
}

module.exports = {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
}