import {postRequestWithCredentials} from "./utils";
import {RatingParams} from "../types/Rating";

export const rateDriver = (
    accessToken: string,
    vehicleId: number,
    bookingId: number,
    data: RatingParams,
) => {
    const url = `http://localhost:5001/api/v1/vehicle/${vehicleId}/booking/${bookingId}/rate`;

    return postRequestWithCredentials(accessToken, url, JSON.stringify(data));
};