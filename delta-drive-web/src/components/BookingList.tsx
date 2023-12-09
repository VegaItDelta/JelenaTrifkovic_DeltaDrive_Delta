import React, {useContext, useEffect, useState} from 'react';
import {
    Typography,
    List,
    ListItem,
    ListItemText,
    Divider,
} from '@mui/material';
import {Booking} from "../types/Booking";
import {getBookings} from "../api/bookings";
import AccountContext from "../contexts/AccountContext";

const BookingList: React.FC<{}> = () => {
    const context = useContext(AccountContext);
    const accessToken = context?.account?.accessToken;

    const [bookings, setBookings] = useState<Booking[]>([]);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const res = await getBookings(accessToken || '');

            setBookings(res?.data?.bookings || []);

        } catch (error) {
            console.error('Error fetching bookings:', error);
        }
    };


    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Booking List
            </Typography>
            <List>
                {bookings.map((booking) => (
                    <React.Fragment key={booking.id}>
                        <ListItem>
                            <ListItemText
                                primary={`Booking ID: ${booking.id}`}
                                secondary={`Start: (${booking.latitudeStart}, ${booking.longitudeStart}), End: (${booking.latitudeEnd}, ${booking.longitudeEnd})`}
                            />
                            <ListItemText
                                primary={`Total Price: ${booking.totalPriceEUR} EUR`}
                                secondary={`Driver: ${booking.Vehicle.driverName}`}
                            />
                        </ListItem>
                        <Divider />
                    </React.Fragment>
                ))}
            </List>
        </div>
    );
};

export default BookingList;
