const {
  User,
  Customer,
  sequelize,
} = require('../models')
const { omit } = require('lodash')
const UserError = require('../utils/userError')

const getUsers = async () => {
  try {
    const users = await User.findAll(
      { where: { isDeleted: 0 },
        include: {
          model: Customer,
          as: 'customer'
        }
      }
    )
    return users
  } catch (err) {
    return new UserError
  }
}

const getSingleUser = async (id) => {
  try {
    const user = await User.findOne({
      where: {
        id,
        isDeleted: 0,
      },
      include: {
        model: Customer,
        as: 'customer'
      }
    })
    return user || new UserError(404, "Not Found")
  } catch (err) {
    return new UserError
  }
}

const createUser = async (body, user) => {
  const { username } = body

  try {
    const userExists = await User.findOne({ where: {
      username,
      isDeleted: 0
    }})
    
    if (!!userExists)
      return new UserError(400, "User already exists")

    const data = await sequelize.transaction(async (t) => {
      // create User
      const newUser = await User.create(
        {
          ...body,
          createdBy: user.id
        },
        { transaction: t }
      )

      // create Customer
      const customer = await Customer.create(
        {
          userId: newUser.id,
          paymentMethod: null,
          isActive: 1
        },
        { transaction: t }
      )

      return {
        ...newUser.dataValues,
        customer
      }
    })

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

const updateUser = async (id, body, reqUser) => {
  try {
    const [user, customer] = await Promise.all([
      await User.findOne({ where: {
        id,
        isDeleted: 0
      }}),
      await Customer.findOne({ where: {
        userId: id,
        isDeleted: 0
      }})
    ])
    
    if (!user || !customer)
      return new UserError(404, "User Not Found")

    const data = await sequelize.transaction(async (t) => {
      // update User
      user.set({
        ...omit(body, ['customer']),
        updatedBy: reqUser.id
      })
      await user.save({ transaction: t })

      // update Customer
      customer.set(body.customer)
      await customer.save({ transaction: t })

      return {
        ...user.dataValues,
        customer
      }
    })

    return data || new UserError
  } catch(e) {
    return new UserError
  }
}

const setStatusUser = async (id, isActive, reqUser) => {
  try {
    const user = await User.findOne({ where: {
      id,
      isDeleted: 0
    }})
    
    if (!user)
      return new UserError(404, "User Not Found")
    
    user.set({
      isActive,
      updatedBy: reqUser.id
    })
    await user.save()

    return user || new UserError
  } catch(e) {
    return new UserError
  }
}

const deleteUser = async (id, reqUser) => {
  try {
    const [user, customer] = await Promise.all([
      await User.findOne({ where: {
        id,
        isDeleted: 0
      }}),
      await Customer.findOne({ where: {
        userId: id,
        isDeleted: 0
      }})
    ])
    
    if (!user || !customer)
      return new UserError(404, "User Not Found")
    
    const data = await sequelize.transaction(async (t) => {
      // delete Customer
      customer.set({
        isDeleted: 1,
        updatedBy: reqUser.id
      })
      await customer.save({ transaction: t })

      // delete User
      user.set({
        isDeleted: 1,
        updatedBy: reqUser.id
      })
      await user.save({ transaction: t })

      return true
    })

    return data
  } catch(e) {
    return new UserError
  }
}

module.exports = {
  getUsers,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  setStatusUser,
}