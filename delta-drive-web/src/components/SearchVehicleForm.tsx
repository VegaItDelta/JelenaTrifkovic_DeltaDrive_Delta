import React, {ChangeEvent, FormEvent, useContext, useEffect, useState} from 'react';
import {Alert, Button, Grid, Paper, TextField, Typography} from '@mui/material';
import {z} from "zod";
import VehiclesList from "./VehiclesList";
import Vehicle from "../types/Vehicle";
import {searchVehicles} from "../api/vehicle";
import AccountContext from "../contexts/AccountContext";

export interface LocationData {
    currentLat: string;
    currentLng: string;
    destinationLat: string;
    destinationLng: string;
}

const FormDataSchema = z.object({
    currentLat: z.number(),
    currentLng: z.number(),
    destinationLat: z.number(),
    destinationLng: z.number(),
});

interface VehicleSearchFormProps {
    error: string | null;
    formData: LocationData;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const VehicleSearchFormBody: React.FC<VehicleSearchFormProps> = ({error, formData, handleChange, handleSubmit}) => {
    return (
        <Paper elevation={3} style={{padding: '20px'}}>
            <Typography variant="h5" gutterBottom>
                Vehicle Search Form
            </Typography>
            {!!error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Current Latitude"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="currentLat"
                    value={formData.currentLat}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Current Longitude"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="currentLng"
                    value={formData.currentLng}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Destination Latitude"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="destinationLat"
                    value={formData.destinationLat}
                    onChange={handleChange}
                    required
                />
                <TextField
                    label="Destination Longitude"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="destinationLng"
                    value={formData.destinationLng}
                    onChange={handleChange}
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Search Vehicles
                </Button>
            </form>
        </Paper>
    );
};

const SearchVehicleForm: React.FC = () => {
    const accountContext = useContext(AccountContext);
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [formData, setFormData] = useState<LocationData>({
        currentLat: '',
        currentLng: '',
        destinationLat: '',
        destinationLng: '',
    });

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    setFormData(prev => ({ ...prev, currentLat: latitude.toString(), currentLng: longitude.toString() }));
                },
                (error) => {
                    console.error('Error getting location:', error.message);
                }
            );
        } else {
            console.error('Geolocation is not supported by your browser.');
        }
    }, []);

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            const validatedData = FormDataSchema.parse({
                currentLat: Number(formData.currentLat),
                currentLng: Number(formData.currentLng),
                destinationLat: Number(formData.destinationLat),
                destinationLng: Number(formData.destinationLng),
            });
            const result = await searchVehicles(accountContext?.account?.accessToken || '', validatedData.currentLat, validatedData.currentLng, validatedData.destinationLat, validatedData.destinationLng);
            setVehicles(result?.data?.nearestVehicles || []);
        } catch (error) {
            console.error('Error searching vehicles:', error);
        }
    };

    return (
        <Grid container justifyContent="center" alignItems="center" style={{height: '100vh'}}>
            <Grid item>
                <VehicleSearchFormBody error={error} formData={formData} handleChange={handleChange} handleSubmit={handleSubmit}/>
            </Grid>
            <Grid item>
                <VehiclesList formData={formData} vehicles={vehicles}/>
            </Grid>
        </Grid>
    );
};

export default SearchVehicleForm;
