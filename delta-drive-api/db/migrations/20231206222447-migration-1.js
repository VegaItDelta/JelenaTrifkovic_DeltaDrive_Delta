'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.addColumn(
                "AccessToken",
                "userId",
                {
                    type: Sequelize.DataTypes.BIGINT,
                    references: {
                        model: "User",
                        key: "id",
                    },
                    allowNull: false,
                },
                {transaction}
            );

            await queryInterface.addColumn(
                "RefreshToken",
                "userId",
                {
                    type: Sequelize.DataTypes.BIGINT,
                    references: {
                        model: "User",
                        key: "id",
                    },
                    allowNull: false,
                },
                {transaction}
            );

            await queryInterface.addColumn(
                "Rating",
                "userId",
                {
                    type: Sequelize.DataTypes.BIGINT,
                    references: {
                        model: "User",
                        key: "id",
                    },
                    allowNull: false,
                },
                {transaction}
            );

            await queryInterface.addColumn(
                "Rating",
                "vehicleId",
                {
                    type: Sequelize.DataTypes.BIGINT,
                    references: {
                        model: "Vehicle",
                        key: "id",
                    },
                    allowNull: false,
                },
                {transaction}
            );

            await queryInterface.addColumn(
                "Booking",
                "userId",
                {
                    type: Sequelize.DataTypes.BIGINT,
                    references: {
                        model: "User",
                        key: "id",
                    },
                    allowNull: false,
                },
                {transaction}
            );

            await queryInterface.addColumn(
                "Booking",
                "vehicleId",
                {
                    type: Sequelize.DataTypes.BIGINT,
                    references: {
                        model: "Vehicle",
                        key: "id",
                    },
                    allowNull: false,
                },
                {transaction}
            );
        });
    },

    async down(queryInterface, Sequelize) {
        return queryInterface.sequelize.transaction(async (transaction) => {
            await queryInterface.removeColumn("Rating", "vehicleId", {transaction});
            await queryInterface.removeColumn("Rating", "userId", {transaction});
            await queryInterface.removeColumn("Booking", "vehicleId", {transaction});
            await queryInterface.removeColumn("Booking", "userId", {transaction});
            await queryInterface.removeColumn("RefreshToken", "userId", {transaction});
            await queryInterface.removeColumn("AccessToken", "userId", {transaction});
        });
    }
};
