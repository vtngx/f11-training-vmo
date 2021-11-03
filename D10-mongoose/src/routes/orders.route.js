const express = require('express')
const {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders.controller')
const { requireAuth } = require('../middlewares/auth.middleware')

const router = express.Router()

router.use(requireAuth)

router.route('/')
  .get(getOrders)
  .post(createOrder)

router.route('/:id')
  .get(getOrder)
  .put(updateOrder)
  .delete(deleteOrder)

module.exports = router