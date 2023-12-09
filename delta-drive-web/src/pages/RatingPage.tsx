import React, {FC, useContext} from 'react';
import {Box, Typography} from "@mui/material";
import AccountContext from "../contexts/AccountContext";
import {useParams} from "react-router-dom";
import RatingForm from "../components/RatingForm";

const RatingPage: FC<{}> = () => {
    const context = useContext(AccountContext);
    const { vehicleId, bookingId } = useParams();

    return (
        <Box m={2}>
            <Typography variant="h4" gutterBottom>
                Hello, {context?.account?.user?.firstName || "Passenger"}!
            </Typography>
            <Typography variant="h4" gutterBottom>Your drive is over!</Typography>
            <Typography variant="h4" gutterBottom>Rate your booking {vehicleId} and {bookingId}!</Typography>
            <RatingForm />
        </Box>
    )
};

export default RatingPage;
