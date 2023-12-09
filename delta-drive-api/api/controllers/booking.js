const {unexpected} = require("../utils/errors/unexpected");
const {Booking, Vehicle} = require("../../db/models");

const listBookings = async (req, res) => {
    try {
        const { userId } = req;

        const bookings = await Booking.findAll({
            where: {
                userId: userId,
            },
            include: [
                {
                    model: Vehicle,
                    attributes: ['driverName'],
                },
            ],
            attributes: [
                'id',
                'latitudeStart',
                'longitudeStart',
                'latitudeEnd',
                'longitudeEnd',
                'totalPriceEUR',
            ],
        });

        return res.status(200).json({
            success: true,
            data: {
                bookings
            },
        });
    } catch (e) {
        return unexpected(res, e);
    }
};

module.exports = {listBookings};
