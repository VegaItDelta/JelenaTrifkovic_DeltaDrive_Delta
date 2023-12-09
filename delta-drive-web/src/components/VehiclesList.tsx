import React, {CSSProperties, useContext, useState} from 'react';
import {List, ListItem, ListItemText, Typography, Paper, Button, Alert} from '@mui/material';
import Vehicle from "../types/Vehicle";
import {bookVehicle, searchVehicles} from "../api/vehicle";
import {BookingParamsSchema} from "../types/Booking";
import {LocationData} from "./SearchVehicleForm";
import AccountContext from "../contexts/AccountContext";
import {useNavigate} from "react-router-dom";

interface VehiclesListProps {
    formData: LocationData;
    vehicles: Vehicle[];
}

const PaperStyles: CSSProperties = { padding: '20px', marginTop: '1em' };
const ListStyles: CSSProperties = { display: 'flex', flexDirection: 'column', gap: '1em'};
const ListItemStyles: CSSProperties = { display: 'flex', flexDirection: 'column', outline: '1px solid green'};

const VehiclesList: React.FC<VehiclesListProps> = ({ formData, vehicles }) => {

    const navigate = useNavigate();
    const accountContext = useContext(AccountContext);
    const [error, setError] = useState<string | null>(null);

    if (vehicles?.length <= 0) {
        return null;
    }

    const onClick = async (vehicleId: number, totalPriceEUR: number) => {
        setError(null);

        try {
            const validatedData = BookingParamsSchema.parse({
                currentLat: Number(formData.currentLat),
                currentLng: Number(formData.currentLng),
                destinationLat: Number(formData.destinationLat),
                destinationLng: Number(formData.destinationLng),
                totalPriceEUR
            });
            const result = await bookVehicle(accountContext?.account?.accessToken || '', vehicleId, validatedData);

            if (result?.accepted) {
                const bookingId = result?.data?.booking?.id;
                navigate(`/vehicle/${vehicleId}/booking/${bookingId}/status`);
            } else {
                setError("Driver rejected!");
            }
        } catch (error) {
            console.error('Error searching vehicles:', error);
            setError("Something went wrong!");
        }
    }

    return (
        <Paper elevation={3} style={PaperStyles}>
            <Typography variant="h5" gutterBottom>
                List of Vehicles
            </Typography>
            {!!error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}
            <List style={ListStyles}>
                {vehicles.map((vehicle) => (
                    <ListItem key={vehicle.id} style={ListItemStyles}>
                        <ListItemText
                            primary={`${vehicle.brand} - ${vehicle.driverName}`}
                            secondary={`Rating: ${vehicle.rating}, Price: ${vehicle.totalPrice} EUR, Distance: ${vehicle.distanceInKilometers * 1000} meters, Start Price: ${vehicle.startPriceInEUR}, Price Per KM: ${vehicle.pricePerKM}`}
                        />
                        <Button variant="contained" onClick={() => onClick(vehicle.id, vehicle.totalPrice)}>Book Vehicle</Button>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default VehiclesList;
