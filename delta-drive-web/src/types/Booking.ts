import {z} from "zod";

export interface BookingParams {
    currentLat: number;
    currentLng: number;
    destinationLat: number;
    destinationLng: number;
    totalPriceEUR: number;
}

export const BookingParamsSchema = z.object({
    currentLat: z.number(),
    currentLng: z.number(),
    destinationLat: z.number(),
    destinationLng: z.number(),
    totalPriceEUR: z.number(),
});

export interface Location {
    latitude: number;
    longitude: number;
}

export const LocationSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
});

export interface Booking {
    id: number;
    latitudeStart: number;
    longitudeStart: number;
    latitudeEnd: number;
    longitudeEnd: number;
    totalPriceEUR: number;
    Vehicle: {
        driverName: string;
    };
};

const VehicleSchema = z.object({
    driverName: z.string(),
});

const BookingSchema = z.object({
    id: z.number(),
    latitudeStart: z.number(),
    longitudeStart: z.number(),
    latitudeEnd: z.number(),
    longitudeEnd: z.number(),
    totalPriceEUR: z.number(),
    Vehicle: VehicleSchema,
});