const express = require('express')
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products.controller')
const { requireAuth } = require('../middlewares/auth.middleware')
const { uploadMulti } = require('../middlewares/upload.middleware')

const router = express.Router()

router.use(requireAuth)

router.route('/')
  .get(getProducts)
  .post(uploadMulti, createProduct)

router.route('/:id')
  .get(getProduct)
  .put(uploadMulti, updateProduct)
  .delete(deleteProduct)

module.exports = router