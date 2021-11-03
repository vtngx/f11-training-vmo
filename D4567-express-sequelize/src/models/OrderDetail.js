const { v1: uuidv1 } = require('uuid')
const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define("OrderDetails", {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv1(),
      allowNull: false,
      primaryKey: true,
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    tax: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    discount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.DOUBLE,
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
  })
}