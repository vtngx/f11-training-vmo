const { sendResponse } = require('../utils/response')
const userService = require('../services/users.service')

const getUsers = async (req, res, next) => {
  const data = await userService.getUsers(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getUser = async (req, res, next) => {
  const data = await userService.getUser(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createUser = async (req, res, next) => {
  const data = await userService.createUser(req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateUser = async (req, res, next) => {
  const data = await userService.updateUser(req.params.id, req.body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const setActive = (isActive) => {
  return async (req, res, next) => {
    const data = await userService.setActive(req.params.id, isActive, req.user)
    
    if (data instanceof Error)
      return next(data)
  
    return sendResponse(data, res)
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  setActive,
}