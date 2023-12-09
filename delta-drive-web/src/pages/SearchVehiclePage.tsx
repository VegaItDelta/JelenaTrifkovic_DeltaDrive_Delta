import React, {FC, useContext, useState} from 'react';
import {Box, Typography} from "@mui/material";
import AccountContext from "../contexts/AccountContext";
import Vehicle from "../types/Vehicle";
import SeachVehicleForm from "../components/SearchVehicleForm";

const SearchVehiclePage: FC<{}> = () => {
    const context = useContext(AccountContext);

    return (
        <Box m={2}>
            <Typography variant="h4" gutterBottom>
                Hello, {context?.account?.user?.firstName || "Passenger"}!
            </Typography>
            <Typography variant="h4" gutterBottom>Want a ride? Search your vehicle!</Typography>
            <SeachVehicleForm />
        </Box>
    )
};

export default SearchVehiclePage;
