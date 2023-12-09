import {z} from "zod";

export default interface Vehicle {
    id: number;
    brand: string;
    driverName: string;
    rating: number;
    startPriceInEUR: number;
    pricePerKM: number;
    latitude: number;
    longitude: number;
    distanceInKilometers: number;
    totalPrice: number;
}

export const VehicleSchema = z.object({
    id: z.number(),
    brand: z.string().min(1),
    driverName: z.string().min(1),
    rating: z.number().nullable(),
    startPriceInEUR: z.number(),
    pricePerKM: z.number(),
    latitude: z.number(),
    longitude: z.number(),
    distanceInKilometers: z.number(),
    totalPrice: z.number(),
});

