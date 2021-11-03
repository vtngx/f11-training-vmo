const jwt = require('jsonwebtoken')
const { User } = require('../models')
const UserError = require('../utils/userError')

const requireAuth = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    token = req.headers.authorization.split(' ')[1]
  else if (req.cookies && req.cookies.token)
    token = req.cookies.token

  if (!token)
    return next(new UserError(401, "Not Authorized"))
  
  try {
    //Verify token
    const decode = jwt.verify(token, process.env.JWT_SECRET)

    if (!decode || !decode.username)
      return next(new UserError(400, "Invalid Token"))
    
    //Get current logged in user by decoded ID
    const user = await User.findOne({ where: { username: decode.username } })

    if (!user)
      return next(new UserError(401, "Not Authorized"))

    req.user = user.dataValues
    next()
  } catch (e) {
    return next(new UserError(401, "Not Authorized"))
  }
}

module.exports = {
  requireAuth,
}