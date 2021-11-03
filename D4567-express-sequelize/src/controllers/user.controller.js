const UserError = require('../utils/userError')
const { sendResponse } = require('../utils/response')
const userService = require('../services/user.service')
const { validationResult } = require('express-validator')

const getUsers = async (req, res, next) => {
  try {
    const data = await userService.getUsers()
    
    if (data instanceof Error)
      return next(data)
  
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const getSingleUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
  
    const data = await userService.getSingleUser(req.params.id)
  
    if (data instanceof Error)
      return next(data)
    
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const createUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))

    const data = await userService.createUser(req.body, req.user)

    if (data instanceof Error)
      return next(data)

    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const activeUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))

    const data = await userService.setStatusUser(
      req.params.id,
      1,
      req.user
    )
    
    if(data instanceof Error)
      return next(data)
  
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const inactiveUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
      
    const data = await userService.setStatusUser(
      req.params.id,
      0,
      req.user
    )
    
    if(data instanceof Error)
      return next(data)
  
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
  
    const data = await userService.updateUser(
      req.params.id,
      req.body,
      req.user
    )
    
    if(data instanceof Error)
      return next(data)
  
    return sendResponse(data, res)
  } catch(e) {
    return next(new UserError)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
  
    const data = await userService.deleteUser(req.params.id, req.user)
    
    if (data instanceof Error)
      return next(data)
  
    return sendResponse({}, res)
  } catch(e) {
    return next(new UserError)
  }
}

module.exports = {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
  activeUser,
  inactiveUser,
  updateUser,
}