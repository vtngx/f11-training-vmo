const authService = require('../services/auth.services')
const { sendTokenResponse } = require('../utils/response')

const login = async (req, res, next) => {
  const data = await authService.login(req, res, next)

  if (data instanceof Error)
    return next(data)

  return sendTokenResponse(data, 200, res)
}

module.exports = {
  login
}