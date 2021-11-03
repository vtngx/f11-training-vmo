const { sendResponse } = require('../utils/response')
const productService = require('../services/products.service')

const getProducts = async (req, res, next) => {
  const data = await productService.getProducts(req.query)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const getProduct = async (req, res, next) => {
  const data = await productService.getProduct(req.params.id)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const createProduct = async (req, res, next) => {
  const body = {
    ...req.body,
    images: [...req.files] || []
  }
  const data = await productService.createProduct(body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const updateProduct = async (req, res, next) => {
  const body = {
    ...req.body,
    images: [...req.files] || []
  }
  const data = await productService.updateProduct(req.params.id, body, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse(data, res)
}

const deleteProduct = async (req, res, next) => {
  const data = await productService.deleteProduct(req.params.id, req.user)
  
  if (data instanceof Error)
    return next(data)

  return sendResponse({}, res)
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}