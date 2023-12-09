const jwt = require("jsonwebtoken");
const {TokenExpiredError} = require("jsonwebtoken");
const {Driver} = require("../utils/Driver");
const {Booking, Vehicle} = require("../../db/models");


const auth = async (socket, next) => {
    const {vehicleId, bookingId, accessToken} = socket.handshake.query;

    if (accessToken && vehicleId && bookingId) {
        jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err && err instanceof TokenExpiredError) {
                socket.emit('error', {message: 'Authentication failed, Access Token was expired'});
                socket.disconnect(true);
            }

            if (err) {
                socket.emit('error', {message: 'Authentication failed'});
                socket.disconnect(true);
            }

            socket.userId = decoded.id;
            socket.vehicleId = vehicleId;
            socket.bookingId = bookingId;
            next();
        });
    } else {
        socket.emit('error', {message: 'Authentication failed'});
        socket.disconnect(true);
    }
}

const checkParams = async (socket, next) => {
    const {vehicleId, bookingId, userId} = socket;

    if (userId && vehicleId && bookingId) {

        const booking = await Booking.findOne({
            where: {
                vehicleId,
                id: bookingId,
                userId,
            },
        });

        const vehicle = await Vehicle.findOne({
            where: {
                id: vehicleId,
            },
        });

        if (booking && vehicle) {
            socket.booking = booking;
            socket.vehicle = vehicle;
            next();
        } else {
            socket.emit('error', {message: 'Params wrong! Not Found!'});
            socket.disconnect(true);
        }
    } else {
        socket.emit('error', {message: 'Params wrong! Not Found!'});
        socket.disconnect(true);
    }
}

const configureWS = (io) => {
    const drivingNamespace = io.of('/simulate-driving');
    drivingNamespace
        .use(auth)
        .use(checkParams)
        .on('connection', (socket) => {
            console.log('A user connected to /simulate-driving namespace');

            socket.emit('message', 'Welcome to the /simulate-driving namespace!');

            const {vehicle, booking} = socket;

            const driver = new Driver(socket, vehicle.latitude, vehicle.longitude);

            driver.simulateDriving({
                latitude: booking.latitudeStart,
                longitude: booking.longitudeStart
            }, {latitude: booking.latitudeEnd, longitude: booking.longitudeEnd});

            // Handle disconnect
            socket.on('disconnect', async () => {
                await Vehicle.update(
                    {
                        available: true,
                        longitude: booking.longitudeEnd,
                        latitude: booking.latitudeEnd,
                    },
                    {
                        where: { id: vehicle.id },
                        returning: true,
                    }
                );
                console.log('User disconnected from /vehicles namespace');
            });
        });
};

module.exports = {configureWS};