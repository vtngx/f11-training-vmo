const authRoutes = require('./auth.route')
const userRoutes = require('./users.route')
const orderRoutes = require('./orders.route')
const productRoutes = require('./products.route')

module.exports = app => {
  app.use('/api/v1/auth', authRoutes),
  app.use('/api/v1/users', userRoutes),
  app.use('/api/v1/orders', orderRoutes)
  app.use('/api/v1/products', productRoutes)
}