const mongoose = require('mongoose')
const { Promise } = require('bluebird')
const ObjectId = mongoose.Types.ObjectId
const { omit, orderBy } = require('lodash')
const Product = require('../models/Product')
const UserError = require('../utils/userError')
const ProductImages = require('../models/ProductImage')
const { deleteMultiSync } = require('../utils/fileUtils')

const getProducts = async (query) => {
  try {
    let { page, limit, sort = "asc" } = query

    page = parseInt(page) || 1
    limit = parseInt(limit) || 20
    const skip = (page - 1) * limit

    const products = await Product.aggregate([
      { $match: { isDeleted: 0 } },
      {
        $lookup: {
          from: "product-images",
          localField: "_id",
          foreignField: "productId",
          as: "product-images"
        }
      },
      { $skip: skip },
      { $limit: limit },
    ])

    return orderBy(products, ['name'],[sort])
  } catch(e) {
    return new UserError
  }
}

const getProduct = async (_id) => {
  try {
    const product = await Product.aggregate([
      { $match: 
        { $and: [
            { _id: ObjectId(_id) },
            { isDeleted: 0 }
          ]
        }
      },
      {
        $lookup: {
          from: "product-images",
          localField: "_id",
          foreignField: "productId",
          as: "product-images"
        }
      }
    ])

    return !!product.length
      ? product[0]
      : new UserError(404, "Product Not Found")
  } catch(e) {
    return new UserError
  }
}

const createProduct = async(body, reqUser) => {
  try {
    let data
    
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // create product
      const product = await Product.create(
        [{
          ...omit(body, ['images']),
          totalPrice: body.price + body.tax - body.discount,
          createdBy: reqUser._id
        }],
        { session }
      )

      // create productImages
      let productImages = []
      if (body.images.length) {
        productImages = await ProductImages.create(
          [...body.images.map(image => {
            return {
              productId: product[0]._id,
              name: image.filename,
              url: image.path.split('_public')[1],
              createdBy: reqUser._id
            }
          })],
          { session }
        )
      }

      data = {
        ...product[0]._doc,
        productImages
      }
    })

    session.endSession()

    return data || new UserError
  } catch(e) {
    if (body.images.length)
      deleteMultiSync(body.images.map(i => i.path))
    
    return new UserError
  }
}

const updateProduct = async(_id, body, reqUser) => {
  try {
    let data

    // check existence
    let [product, productImages] = await Promise.all([
      Product.findOne({ _id, isDeleted: 0 }),
      ProductImages.find({ productId: _id, isDeleted: 0 })
    ])
    
    if (!product)
      return new UserError(404, "Product Not Found")
    
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // update product
      product.set({
        ...omit(body, ['images']),
        totalPrice: body.price + body.tax - body.discount,
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await product.save({ session })
      
      // update productImages
      let updatedImages = [...productImages]

      if (body.images.length) {
        // create new images
        updatedImages = await ProductImages.create(
          [...body.images.map(image => {
            return {
              productId: product._id,
              name: image.filename,
              url: image.path.split('_public')[1],
              createdBy: product.createdBy,
              createdAt: product.createdAt,
              updatedBy: reqUser._id,
              updatedAt: Date.now()
            }
          })],
          { session }
        )
      }

      // delete old images
      if (productImages.length) {
        // delete in db
        await ProductImages
          .deleteMany({ _id: { $in: productImages.map(i => i._id) } })
          .session(session)
          
        // delete images
        deleteMultiSync(productImages.map(i => `${__dirname}/../_public/${i.url}`))
      }

      data = {
        ...product._doc,
        productImages: updatedImages
      }
    })

    session.endSession()

    return data || new UserError
  } catch(e) {
    if (body.images.length)
      deleteMultiSync(body.images.map(i => i.path))
      
    return new UserError
  }
}

const deleteProduct = async (_id, reqUser) => {
  try {
    // check product existence
    const [product, productImages] = await Promise.all([
      Product.findOne({ _id, isDeleted: 0 }),
      ProductImages.find({ productId: _id, isDeleted: 0 })
    ])
    
    if (!product)
      return new UserError(404, "Product Not Found")
    
    // start transaction
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      // update product
      product.set({
        isDeleted: 1,
        updatedBy: reqUser._id,
        updatedAt: Date.now()
      })
      await product.save({ session })

      // update productImages
      if (productImages.length) {
        await Promise.map(productImages, async item => {
          item.set({
            ...item,
            isDeleted: 1,
            updatedBy: reqUser._id,
            updatedAt: Date.now()
          })
          await item.save({ session })
        })

        // delete images from server
        deleteMultiSync(productImages.map(i => `${__dirname}/../_public/${i.url}`))
      }
      
      return true
    })

    session.endSession()

    return true
  } catch(e) {
    return new UserError
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
}