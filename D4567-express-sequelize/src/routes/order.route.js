const {
  getOrders,
  getSingleOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/order.controller')
const {
  validateParamId,
} = require('../utils/validatior')

const express = require('express')

const router = express.Router()

router.route('/')
  .get(getOrders)
  .post(createOrder)

router.route('/:id')
  .get(validateParamId(), getSingleOrder)
  .put(validateParamId(), updateOrder)
  .delete(validateParamId(), deleteOrder)

module.exports = router