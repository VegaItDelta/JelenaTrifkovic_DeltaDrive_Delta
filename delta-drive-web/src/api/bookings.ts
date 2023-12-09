import {getRequestWithCredentials} from "./utils";

export const getBookings = (
    accessToken: string,
) => {
    const url = 'http://localhost:5001/api/v1/booking/history';

    return getRequestWithCredentials(accessToken, url);
};