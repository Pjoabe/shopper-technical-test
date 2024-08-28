'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Measure extends Model {}

  Measure.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    customer_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    measure_datetime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    measure_type: {
      type: DataTypes.ENUM('WATER', 'GAS'),
      allowNull: false
    },
    value: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    has_confirmed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'Measures',
    modelName: 'Measure',
    timestamps: true
  });

  return Measure;
};
