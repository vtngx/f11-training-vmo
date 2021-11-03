module.exports = (req, res, next) => {
  next()
  console.log(
    `${req.method}...${req.baseUrl}:`,
    'body:',
    req.body,
    'query:',
    req.query,
    'params:',
    req.params,
  )
}