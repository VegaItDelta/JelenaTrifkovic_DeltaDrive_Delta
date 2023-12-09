import React, {FC} from 'react';
import {Box, Button, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const HomePage: FC<{}> = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Typography variant="h4">
                Hello, Passenger!
            </Typography>
            <Button variant="contained" onClick={() => navigate('sign-in')}>
                Sign in?
            </Button>
            <Typography variant="h6">
                or
            </Typography>
            <Button variant="contained" onClick={() => navigate('sign-up')}>
                Sign up?
            </Button>
        </Box>
    );
}

export default HomePage;
