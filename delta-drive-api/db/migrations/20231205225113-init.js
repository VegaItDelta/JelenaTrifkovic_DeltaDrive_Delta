'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.createTable("User", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        firstName: {
          type: Sequelize.STRING,
        },
        lastName: {
          type: Sequelize.STRING,
        },
        birthday: {
          type: Sequelize.STRING,
        },
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.createTable("AccessToken", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        token: {
          type: Sequelize.STRING,
        },
        expiryDate: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.createTable("RefreshToken", {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        token: {
          type: Sequelize.STRING,
        },
        expiryDate: {
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.createTable('Vehicle', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT,
        },
        brand: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        driverName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        latitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        longitude: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        startPriceInEUR: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        pricePerKM: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        earnings: {
          type: Sequelize.DOUBLE,
          allowNull: true,
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        available: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      }, { transaction });

      await queryInterface.createTable('Booking', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        latitudeStart: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        longitudeStart: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        latitudeEnd: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        longitudeEnd: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        totalPriceEUR: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      }, { transaction });

      await queryInterface.createTable('Rating', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.BIGINT
        },
        rating: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        comment: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        }
      }, { transaction });
    });
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.dropTable("Rating", { transaction });
      await queryInterface.dropTable("Booking", { transaction });
      await queryInterface.dropTable("Vehicle", { transaction });
      await queryInterface.dropTable("RefreshToken", { transaction });
      await queryInterface.dropTable("AccessToken", { transaction });
      await queryInterface.dropTable("User", { transaction });
    });
  }
};
