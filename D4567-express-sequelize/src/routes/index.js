const userRoutes = require('./user.route')
const authRoutes = require('./auth.route')
const orderRoutes = require('./order.route')

module.exports = app => {
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/orders', orderRoutes)
}