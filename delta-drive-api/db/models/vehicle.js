'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      Vehicle.hasMany(models.Rating, {
        foreignKey: "userId",
        allowNull: false,
      });
      Vehicle.hasMany(models.Booking, {
        foreignKey: "userId",
        allowNull: false,
      });
    }
  }
  Vehicle.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    driverName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    startPriceInEUR: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    pricePerKM: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    earnings: {
      type: DataTypes.DOUBLE,
      allowNull: true,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Vehicle',
    timestamps: true,
    underscored: false,
  });
  return Vehicle;
};