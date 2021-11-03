/*
  DAY 7 EXERCISES

  run: mongo day7.mongoscript.js
*/

const conn = Mongo()
let db = conn.getDB("d7-f11n12-db")

db.dropDatabase()
db = conn.getDB("d7-f11n12-db")

// data seeding
db.users.insert({
  'username': 'user1',
  'password': '123',
  "age": 21,
  "email": "demo@vmodev.com",
  "phone": "0123456789",
  "address": "earth-0",
  "isActive": 1
})

const users = db.users.find()

if (users.hasNext()) {
  const user = users.next()

  // create customer
  db.customers.insert({
    'userId': user._id,
    paymentMethod: null,
    isActive: 1
  })

  const customers = db.customers.find({ userId: user._id })
  if (customers.hasNext()) {
    const customer = customers.next()
    if (String(customer.userId) === String(user._id)) {
      print('\n> Created User & Customer')

      db.products.insert({
        'name': "GPX Legends 150",
        'description': "motor 1",
        'price': 50000000,
        'tax': 0,
        'discount': 0,
        'totalPrice': 50000000,
        'isDeleted': 0
      })
      db.products.insert({
        'name': "Honda CB300R",
        'description': "motor 2",
        'price': 120000000,
        'tax': 0,
        'discount': 0,
        'totalPrice': 120000000,
        'isDeleted': 0
      })

      const products = db.products.find()

      while (products.hasNext()) {
        const product = products.next()
        db.productImages.insert({
          name: "img",
          productId: product._id,
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCh6VZ3XJeMsZE1h5FeO_Kb9mdslZcSTSHVKJ3C_j2H2r6Sc2zaEhaRvAH2usoTHZ_9lM&usqp=CAU",
          isDeleted: 0
        })

        const images = db.productImages.find({ productId: product._id })
        if (images.hasNext()) {
          const image = images.next()
          if (String(image.productId) === String(product._id)) {
            print('> Created Product & Image')

            db.orders.insert({
              price: product.price,
              customerId: customer._id,
              tax: product.tax,
              discount: product.discount,
              totalPrice: product.totalPrice,
              isDeleted: 0
            })

            const orders = db.orders.find({ price: product.price })
            if(orders.hasNext()) {
              const order = orders.next()
              db.orderDetails.insert({
                price: product.price,
                orderId: order._id,
                productId: product._id,
                tax: product.tax,
                discount: product.discount,
                totalPrice: product.totalPrice,
                isDeleted: 0
              })

              const orderDetails = db.orderDetails.find({
                orderId: order._id,
                productId: product._id
              })

              if (orderDetails.hasNext()) {
                const orderDetail = orderDetails.next()
                if (
                  String(orderDetail.orderId) === String(order._id) &&
                  String(orderDetail.productId) === String(product._id)
                )
                  print('> Created Order & OrderDetail')
              }
            }
          }
        }
      }
    }
  }
}

/*
  2.
  select tất cả thông tin về đơn hàng, chi tiết đơn hàng,
  chi tiết sản phẩm trong đơn hàng của mỗi customer.
*/
const getCustomersOrders = db.customers.aggregate([
  {
    $lookup: {
      from: "orders",
      localField: "_id",
      foreignField: "customerId",
      as: "orders"
    }
  }, {
    $unwind: {
      path: "$orders",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "orderDetails",
      localField: "orders._id",
      foreignField: "orderId",
      as: "orders.orderDetails",
    }
  }, {
    $unwind: {
      path: "$orders.orderDetails",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "products",
      localField: "orders.orderDetails.productId",
      foreignField: "_id",
      as: "orders.orderDetails.products",
    }
  }, {
    $unwind: {
      path: "$orders.orderDetails.products",
      preserveNullAndEmptyArrays: true
    }
  }, {
    $lookup: {
      from: "productImages",
      localField: "orders.orderDetails.products._id",
      foreignField: "productId",
      as: "orders.orderDetails.products.images",
    }
  }, 
]).pretty()

print('\n// 2. Select all Orders + OrderDetails + Products + Customers')
while (getCustomersOrders.hasNext()) {
  printjson(getCustomersOrders.next())
}

/*
  3.
  select tất cả users (có cả thông tin customer của mỗi user)
*/
const getUsers = db.users.aggregate([
  {
    $lookup: {
      from: "customers",
      localField: "_id",
      foreignField: "userId",
      as: "customer"
    }
  }
]).pretty()

print('\n// 3. Select all Users with Customers')
while (getUsers.hasNext()) {
  printjson(getUsers.next())
}

/*
  4.
  select tất cả các sản phẩm và ảnh của mỗi sản phẩm. limit 0 – 20, where like name
*/
const getProducts = db.products.aggregate([
  {
    $lookup: {
      from: "productImages",
      localField: "_id",
      foreignField: "productId",
      as: "productImages"
    }
  },
  {
    $match:{
      $and: [{"name" : /Honda/}]
    }
  },
]).pretty()

print('\n// 4. Select all Products with ProductDetails')
while (getProducts.hasNext()) {
  printjson(getProducts.next())
}