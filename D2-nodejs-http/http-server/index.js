const {
  handleGET,
  handlePOST,
  handleDELETE,
} = require('./src/controller')
require('dotenv').config()
const http = require('http')

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080

const requestListener = (req, res) => {
  if (req.method === 'GET')
    return handleGET(req, res)
  else if (req.method === 'POST')
    return handlePOST(req, res)
  else if (req.method === 'DELETE')
    return handleDELETE(req, res)
  // else if (req.method === 'PUT')
  //   return handlePUT(req, res)
}

const server = http.createServer(requestListener)
server.listen(PORT, HOST, () => {
  console.log(`> Server online on http://${HOST}:${PORT}`)
})