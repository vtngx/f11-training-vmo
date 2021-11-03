const { User } = require('../models')
const UserError = require("../utils/userError")

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ where: { username } })

    if (!user)
      return next(new UserError(401, "Invalid Credentials"))

    return !!await user.validPassword(password)
      ? user
      : next(new UserError(401, "Invalid Credentials"))
  } catch(err) {
    return new UserError
  }
}

module.exports = {
  login,
}