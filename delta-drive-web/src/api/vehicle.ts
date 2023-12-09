import {getRequestWithCredentials, postRequestWithCredentials} from "./utils";
import {BookingParams} from "../types/Booking";


export const searchVehicles = (
    accessToken: string,
    currentLat: number,
    currentLng: number,
    destinationLat: number,
    destinationLng: number
) => {
    const url = 'http://localhost:5001/api/v1/vehicle/search';
    const queryParams = `?currentLat=${currentLat}&currentLng=${currentLng}&destinationLat=${destinationLat}&destinationLng=${destinationLng}`;

    return getRequestWithCredentials(accessToken, url, queryParams);
};

export const bookVehicle = (
    accessToken: string,
    vehicleId: number,
    data: BookingParams,
) => {
    const url = `http://localhost:5001/api/v1/vehicle/${vehicleId}/request-booking`;

    return postRequestWithCredentials(accessToken, url, JSON.stringify(data));
};

