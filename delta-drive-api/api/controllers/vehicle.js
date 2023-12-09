const {unexpected} = require("../utils/errors/unexpected");
const {sequelize, Vehicle, Booking, Rating} = require("../../db/models");
const simulateDriverRejection = require("../utils/simulateRejection");
const {LocationSchema, BookingParamsSchema} = require("../validators/location");

const search = async (req, res) => {
    try {
        const {currentLat, currentLng, destinationLat, destinationLng} = req.query;

        LocationSchema.parse({
            currentLat: Number(currentLat),
            currentLng: Number(currentLng),
            destinationLat: Number(destinationLat),
            destinationLng: Number(destinationLng),
        });

        if (!currentLat || !currentLng || !destinationLat || !destinationLng) {
            return res.status(400).json({success: false, errorMessage: 'Missing or invalid parameters'});
        }

        const result = await Vehicle.findAll({
            attributes: [
                'id',
                'brand',
                'driverName',
                'rating',
                'startPriceInEUR',
                'pricePerKM',
                'latitude',
                'longitude',
                [
                    sequelize.literal(`6371 * acos(cos(radians(${currentLat})) * cos(radians(latitude)) * cos(radians(${currentLng}) - radians(longitude)) + sin(radians(${currentLat})) * sin(radians(latitude)))`),
                    'distanceInKilometers',
                ],
                [
                    sequelize.literal(`6371 * acos(cos(radians(${currentLat})) * cos(radians(latitude)) * cos(radians(${currentLng}) - radians(longitude)) + sin(radians(${currentLat})) * sin(radians(latitude))) * "pricePerKM" + "startPriceInEUR"`),
                    'totalPrice',
                ],
            ],
            where: {
                available: true,
            },
            order: [
                [sequelize.literal(`6371 * acos(cos(radians(${currentLat})) * cos(radians(latitude)) * cos(radians(${currentLng}) - radians(longitude)) + sin(radians(${currentLat})) * sin(radians(latitude)))`), 'ASC'],
            ],
            limit: 10,
            raw: true,
        });

        return res.status(200).json({
            success: true,
            data: {
                nearestVehicles: result
            },
        });
    } catch (e) {
        return unexpected(res, e);
    }
};

const requestBooking = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { currentLat, currentLng, destinationLat, destinationLng, totalPriceEUR } = req.body;
        const { vehicleId } = req.params;
        const { userId } = req;

        BookingParamsSchema.parse({
            currentLat: Number(currentLat),
            currentLng: Number(currentLng),
            destinationLat: Number(destinationLat),
            destinationLng: Number(destinationLng),
            totalPriceEUR: Number(totalPriceEUR),
        });

        const vehicle = await Vehicle.findByPk(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ success: false, errorMessage: 'Vehicle not found' });
        }

        const rejected = simulateDriverRejection();

        if (rejected) {
            return res.status(200).json({ success: true, accepted: false });
        }

        const [updatedRows] = await Vehicle.update(
            { available: false },
            { where: { id: vehicleId }, transaction: t }
        );

        if (!(updatedRows > 0)) {
            await t.rollback();
            return res.status(404).json({ success: false, errorMessage: 'Vehicle not found' });
        }

        const created = await Booking.create({
            latitudeStart: currentLat,
            longitudeStart: currentLng,
            latitudeEnd: destinationLat,
            longitudeEnd: destinationLng,
            userId,
            vehicleId,
            totalPriceEUR
        }, {transaction: t});

        if (!created) {
            await t.rollback();
            return unexpected(res);
        }

        await t.commit();
        return res.status(200).json({
            success: true,
            accepted: true,
            data: {
                booking: created
            },
        });
    } catch (e) {
        await t.rollback();
        return unexpected(res, e);
    }
};

const rateDriver = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        const { rating, comment } = req.body;
        const { vehicleId, bookingId } = req.params;
        const { userId } = req;

        const vehicle = await Vehicle.findByPk(vehicleId);

        if (!vehicle) {
            return res.status(404).json({ success: false, errorMessage: 'Vehicle not found' });
        }

        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ success: false, errorMessage: 'Booking not found' });
        }

        const created = await Rating.create({
            rating,
            comment,
            userId,
            vehicleId
        }, { transaction: t });

        const result = await Rating.findOne({
            attributes: [
                [sequelize.fn('AVG', sequelize.literal('rating')), 'averageRating'],
            ],
            where: {
                vehicleId: vehicleId,
            },
            raw: true,
            transaction: t,
        });

        const averageRating = Math.floor(result.averageRating) || 0;

        await Vehicle.update({ rating: averageRating }, { where: { id: vehicleId }, transaction: t });

        if (!created) {
            await t.rollback();
            return unexpected(res);
        }

        await t.commit();

        return res.status(200).json({
            success: true,
            data: {
                booking: created
            },
        });
    } catch (e) {
        await t.rollback();
        return unexpected(res, e);
    }
};

module.exports = {search, requestBooking, rateDriver};
