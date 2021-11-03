const {
  User,
  Order,
  Product,
  Customer,
  OrderDetail,
  ProductImage,
} = require('../models')

const seeder = async () => {
  try {
    // seed User
    const user = await User.create({
      username: "vietnh",
      password: "123",
      age: 21,
      email: "vietnh@vmodev.com",
      phone: "0384846791",
      address: "HN",
      isActive: 1
    })

    if (!user)
      throw "Seeding user failed"
    
    // seed Customer
    const customer = await Customer.create({
      userId: user.id,
      paymentMethod: 1234567890,
      isActive: 1
    })

    if (!customer)
      throw "Seeding customer failed"
    
    // seed Product
    const product1 = await Product.create({
      name: "Honda CB300R",
      description: "abc",
      price: 120000000,
      tax: 0,
      discount: 0,
      totalPrice: 120000000,
      isDeleted: 0
    })

    if (!product1)
      throw "Seeding product1 failed"
    else {
      const pImage1 = await ProductImage.create({
        name: "Honda Pic 1",
        productId: product1.id,
        url: "https://cms-i.autodaily.vn/du-lieu/2019/12/03/Honda%20CB300R/dsc-7696-copy.jpg",
        isDeleted: 0
      })
  
      if (!pImage1)
        throw "Seeding ProductImage1 failed"
      
      const pImage2 = await ProductImage.create({
        name: "Honda Pic 2",
        productId: product1.id,
        url: "https://cms-i.autodaily.vn/du-lieu/2019/12/03/Honda%20CB300R/dsc-7758-copy.jpg",
        isDeleted: 0
      })
  
      if (!pImage2)
        throw "Seeding ProductImage2 failed"
    }

    const product2 = await Product.create({
      name: "GPX Legends 150",
      description: "abc",
      price: 50000000,
      tax: 0,
      discount: 0,
      totalPrice: 50000000,
      isDeleted: 0
    })

    if (!product2)
      throw "Seeding product2 failed"
    else {
      const pImage3 = await ProductImage.create({
        name: "GPX Pic 1",
        productId: product2.id,
        url: "https://muaxe.minhlongmoto.com/wp-content/uploads/2020/01/xe-gpx-legend-150.jpg",
        isDeleted: 0
      })
  
      if (!pImage3)
        throw "Seeding ProductImage3 failed"
      
      const pImage4 = await ProductImage.create({
        name: "GPX Pic 2",
        productId: product2.id,
        url: "https://muaxe.minhlongmoto.com/wp-content/uploads/2021/04/legend-150-fi-mau-den-bong.jpg",
        isDeleted: 0
      })
  
      if (!pImage4)
        throw "Seeding ProductImage3 failed"
    }

    // seed Orders
    const order1 = await Order.create({
      price: product1.price,
      customerId: customer.id,
      tax: product1.tax,
      discount: product1.discount,
      totalPrice: product1.totalPrice,
      isDeleted: 0
    })

    if (!order1)
      throw "Seeding Order1 failed"
    else {
      const item = await OrderDetail.create({
        price: product1.price,
        orderId: order1.id,
        productId: product1.id,
        tax: product1.tax,
        discount: product1.discount,
        totalPrice: product1.totalPrice,
        isDeleted: 0
      })
      
      if (!item)
        throw "Seeding OrderDetail for Order1 failed"
    }

    const order2 = await Order.create({
      price: product2.price,
      customerId: customer.id,
      tax: product2.tax,
      discount: product2.discount,
      totalPrice: product2.totalPrice,
      isDeleted: 0
    })

    if (!order2)
      throw "Seeding Order2 failed"
    else {
      const item = await OrderDetail.create({
        price: product2.price,
        orderId: order2.id,
        productId: product2.id,
        tax: product2.tax,
        discount: product2.discount,
        totalPrice: product2.totalPrice,
        isDeleted: 0
      })
      
      if (!item)
        throw "Seeding OrderDetail for Order1 failed"
    }
  } catch(err) {
    console.log(err)
  }
}

module.exports = seeder