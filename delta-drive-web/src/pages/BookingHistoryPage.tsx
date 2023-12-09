import React, {FC, useContext} from 'react';
import {Box, Typography} from "@mui/material";
import AccountContext from "../contexts/AccountContext";
import BookingList from "../components/BookingList";

const BookingHistoryPage: FC<{}> = () => {
    const context = useContext(AccountContext);
    return (
        <Box>
            <Typography variant="h4">
                Hello, {context?.account?.user?.firstName || "Passenger"}!
            </Typography>
            <Typography variant="h4">Look at your booking history!</Typography>
            <BookingList />
        </Box>
    )
};

export default BookingHistoryPage;
