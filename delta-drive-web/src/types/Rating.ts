import {z} from "zod";

export interface RatingParams {
    rating: number;
    comment?: string;
}

export const RatingParams = z.object({
    rating: z.number().min(0).max(5),
    comment: z.string().optional(),
});