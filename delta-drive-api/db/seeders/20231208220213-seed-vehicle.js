'use strict';
const csvParser = require('csv-parser');
const fs = require('fs');
const path = require('path');

const transformRawDataToVehicle = (rawData) => {
    return ({
        brand: rawData?.brand,
        driverName: rawData?.firstName + " " + rawData?.lastName,
        latitude: Number(rawData?.latitude),
        longitude: Number(rawData?.longitude),
        startPriceInEUR: Number(rawData?.startPrice?.replaceAll("EUR", "")),
        pricePerKM: Number(rawData?.pricePerKM?.replaceAll("EUR", "")),
        rating: null,
        available: true,
    });
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface) {
        const results = [];
        const absoluteFilePath = path.join(__dirname, 'delta-drive.csv');

        await new Promise((resolve) => {
            fs.createReadStream(absoluteFilePath)
                .pipe(csvParser())
                .on('data', (data) => {
                    results.push(transformRawDataToVehicle(data));
                })
                .on('end', resolve);
        });

        return queryInterface.bulkInsert('Vehicle', results, {});
    },

    async down (queryInterface) {
        return queryInterface.bulkDelete('Vehicle', null, {});
    }
};