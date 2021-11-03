const utils = require('../utils/writer.js')
const User = require('../service/UserService')

const getUsers = (req, res, next) => {
  const data = User.getUsers()
  utils.writeJson(res, { data })
}

module.exports = {
  getUsers
}