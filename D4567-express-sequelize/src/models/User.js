const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v1: uuidv1 } = require('uuid')
const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv1(),
      allowNull: false,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(32),
      allowNull: false,
      // unique: true
    },
    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    address: {
      type: DataTypes.STRING(500),
    },
    isActive: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
    },
    isDeleted: {
      type: DataTypes.INTEGER(1),
      allowNull: false,
      defaultValue: 0,
    },
    createdBy: {
      type: DataTypes.UUID,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    updatedBy: {
      type: DataTypes.UUID,
      defaultValue: null,
    }
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      },
      beforeUpdate: async (user) => {
        if (user.password && user.changed('password')) {
          const salt = await bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    },
  })
  User.prototype.validPassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
  }

  User.prototype.getSignedJwtToken = function () {
    return jwt.sign(
      // { id: this.id },
      { username: this.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXP }
    )
  }

  return User
}