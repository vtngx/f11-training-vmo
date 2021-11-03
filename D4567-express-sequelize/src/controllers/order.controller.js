const UserError = require('../utils/userError')
const { sendResponse } = require('../utils/response')
const orderService = require('../services/order.service')
const { validationResult } = require('express-validator')

const getOrders = async (req, res, next) => {
  try {
    const data = await orderService.getOrders()
    
    if (data instanceof Error)
      return next(data)
  
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const getSingleOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
  
    const { id } = req.params
  
    const data = await orderService.getSingleOrder({ id })
  
    if (data instanceof Error)
      return next(data)
    
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const createOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))

    const data = await orderService.createOrder(req.body)

    if (data instanceof Error)
      return next(data)

    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const updateOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
  
    const data = await orderService.updateOrder({ id: req.params.id }, req.body)
    
    if(data instanceof Error)
      return next(data)
  
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const deleteOrder = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
  
    const data = await orderService.deleteOrder({ id: req.params.id })
    
    if (data instanceof Error)
      return next(data)
  
    return sendResponse({}, res)
  } catch(e) {
    return next(new UserError)
  }
}

module.exports = {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
}