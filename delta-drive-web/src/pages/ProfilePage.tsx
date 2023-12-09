import React, {CSSProperties, FC, useContext} from 'react';
import {Box, Button, Typography} from "@mui/material";
import AccountContext from "../contexts/AccountContext";
import {useNavigate} from "react-router-dom";

const styles: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    gap: '1em',
};

const ProfilePage: FC<{}> = () => {
    const context = useContext(AccountContext);
    const navigate = useNavigate();

    const handleClick = (url: string) => () => {
        navigate(url);
    };

    return (
        <Box m={2}>
            <Typography variant="h4">
                Hello, {context?.account?.user?.firstName || "Passenger"}!
            </Typography>
            <Box mt={2} style={styles}>
                <Button variant="contained" onClick={handleClick("/vehicle-search")}>Search 10 Nearest Vehicles</Button>
                <Button variant="contained" onClick={handleClick("/booking-history")}>Show Previously Booked Rides</Button>
                <Button variant="contained" onClick={context?.logOut}>Log Out</Button>
            </Box>
        </Box>
    );
};

export default ProfilePage;
