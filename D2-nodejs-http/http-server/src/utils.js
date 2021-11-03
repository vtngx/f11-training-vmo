const http = require('http')

const handleError = (res, code, msg) => {
  res.writeHead(code, { "Content-Type": "application/json" })
  return res.end(JSON.stringify({
    error: msg || `${http.STATUS_CODES[code]}`
  }))
}

const baseResponse = (res, jsonData) => {
  res.writeHead(200, { "Content-Type": "application/json" })
  return res.end(jsonData)
}

module.exports = {
  handleError,
  baseResponse,
}