import React, {FC, useContext, useEffect, useState} from 'react';
import {Box, Typography} from "@mui/material";
import AccountContext from "../contexts/AccountContext";
import {useNavigate, useParams} from "react-router-dom";
import {Location, LocationSchema} from "../types/Booking";
import {AccountCredentialSchema} from "../types/Account";
import {io} from "socket.io-client";

const BookingHistoryPage: FC<{}> = () => {
    const context = useContext(AccountContext);
    const accessToken = context?.account?.accessToken;
    const { vehicleId, bookingId } = useParams();
    const [locationUpdate, setLocationUpdate] = useState<Location | null>(null);
    const [arrived, setArrived] = useState<boolean>(false);
    const [driveEnded, setDriveEnded] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        const socket = io(`http://localhost:5001/simulate-driving`, {
            query: {
                accessToken,
                vehicleId,
                bookingId,
            },
            transports : ['websocket'],
        });

        socket.connect();

        socket.on('updateLocation', (data: any) => {
            setLocationUpdate(data?.location);
        });

        socket.on('driverArrived', () => {
            setArrived(true);
        });

        socket.on('driveEnded', () => {
            setDriveEnded(true);
            navigate(`/vehicle/${vehicleId}/booking/${bookingId}/rate`);
        });

        return () => {
            socket.disconnect();
        };
    }, [vehicleId, bookingId, accessToken]);

    return (
        <Box m={2}>
            <Typography variant="h4" gutterBottom>
                Hello, {context?.account?.user?.firstName || "Passenger"}!
            </Typography>
            <Typography variant="h4" gutterBottom>Look at your booking {vehicleId} and {bookingId}!</Typography>
            <Typography variant="h6" gutterBottom>Location is lng:{locationUpdate?.longitude} and lat:{locationUpdate?.latitude}</Typography>
            {arrived && <Typography variant="h6" gutterBottom>Arrived!!</Typography>}
            {driveEnded && <Typography variant="h6" gutterBottom>Drive ended!!</Typography>}
        </Box>
    )
};

export default BookingHistoryPage;
