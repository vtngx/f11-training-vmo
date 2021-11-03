module.exports = class UserError extends Error {
  constructor(statusCode, message, errObj) {
    super(message)
    this.statusCode = statusCode
    this.errObj = errObj
  }
}