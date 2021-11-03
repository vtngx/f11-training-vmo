const UserError = require('../utils/userError')
const authService = require('../services/auth.service')
const { sendTokenResponse } = require('../utils/response')
const { validationResult } = require('express-validator')

const login = async (req, res, next) => {
  try {
    const errors = validationResult(req)
    
    if (errors && !errors.isEmpty())
      return next(new UserError(422, undefined, errors.array()))
    
    const data = await authService.login(req, res, next)
    
    if (data instanceof Error)
      return next(data)
  
    return sendTokenResponse(data, 200, res)
  } catch(err) {
    return next(new UserError)
  }
}

module.exports = {
  login,
}