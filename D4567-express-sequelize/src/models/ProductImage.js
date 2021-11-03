const { v1: uuidv1 } = require('uuid')
const { DataTypes } = require('sequelize')

module.exports = sequelize => {
  return sequelize.define("ProductImage", {
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
    url: {
      type: DataTypes.STRING(100),
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