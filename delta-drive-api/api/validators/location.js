const { z } = require('zod');

const LocationSchema = z.object({
    currentLat: z.number(),
    currentLng: z.number(),
    destinationLat: z.number(),
    destinationLng: z.number(),
});

const BookingParamsSchema = z.object({
    currentLat: z.number(),
    currentLng: z.number(),
    destinationLat: z.number(),
    destinationLng: z.number(),
    totalPriceEUR: z.number(),
});

module.exports = { LocationSchema, BookingParamsSchema };