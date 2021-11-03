const dbConfig = require("../configs/db")

const Sequelize = require('sequelize')

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: false
})

//  initialize models
const User = require('./User')(sequelize)
const Customer = require('./Customer')(sequelize)
const Order = require('./Order')(sequelize)
const OrderDetail = require('./OrderDetail')(sequelize)
const Product = require('./Product')(sequelize)
const ProductImage = require('./ProductImage')(sequelize)

//  define relationships
User.hasOne(Customer, { foreignKey: "userId", as: 'customer' })
Customer.belongsTo(User, { foreignKey: "userId" })
Customer.hasMany(Order, { foreignKey: "customerId" })
Order.hasMany(OrderDetail, { foreignKey: "orderId", as: 'orderDetails' })
OrderDetail.belongsTo(Order, { foreignKey: "orderId" })
OrderDetail.belongsTo(Product, { foreignKey: "productId" })
ProductImage.belongsTo(Product, { foreignKey: "productId" })

//  initizlize database
const db = {
  Sequelize,
  sequelize,
  User,
  Customer,
  Order,
  OrderDetail,
  Product,
  ProductImage
}

module.exports = db