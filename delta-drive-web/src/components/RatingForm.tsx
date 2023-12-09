import React, {useContext, useState} from 'react';
import {Alert, Box, Button, Rating, TextField, Typography} from '@mui/material';
import {useNavigate, useParams} from "react-router-dom";
import {RatingParams} from "../types/Rating";
import {rateDriver} from "../api/rating";
import AccountContext from "../contexts/AccountContext";

const RatingForm: React.FC = () => {
    const { vehicleId, bookingId } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState<string | null>(null);
    const context = useContext(AccountContext);
    const [rating, setRating] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const handleRatingChange = (event: React.ChangeEvent<{}>, newValue: number | null) => {
        if (newValue !== null) {
            setRating(newValue);
        }
    };

    const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setComment(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const validatedData = RatingParams.parse({
                rating,
                comment
            });
            console.log("validatedData", validatedData)
            vehicleId && bookingId && await rateDriver(context?.account?.accessToken || '', Number(vehicleId), Number(bookingId), validatedData);
            navigate("/profile");
        } catch (error) {
            console.error('Error searching vehicles:', error);
            setError("Something went wrong!");
        }
    };

    return (
        <Box>
            <Typography variant="h5" gutterBottom>
                Rate and Comment
            </Typography>
            {!!error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}
            <Box mb={2}>
                <Rating
                    name="rating"
                    value={rating}
                    precision={1}
                    onChange={handleRatingChange}
                />
            </Box>
            <TextField
                label="Optional Comment"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                value={comment}
                onChange={handleCommentChange}
            />
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Box>
    );
};

export default RatingForm;
