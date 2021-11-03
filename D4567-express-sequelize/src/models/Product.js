const { v1: uuidv1 } = require('uuid')
const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define("Product", {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv1(),
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(300),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(4000),
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    tax: {
      type: DataTypes.DOUBLE,
    },
    discount: {
      type: DataTypes.DOUBLE,
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
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
  })
}