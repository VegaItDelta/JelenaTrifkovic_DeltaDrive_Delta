import React, {useContext} from 'react';
import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import AccountContext, {AccountContextProvider} from "./contexts/AccountContext";
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SignUpPage from './pages/SignUpPage';
import SignInPage from './pages/SignInPage';
import SearchVehiclePage from './pages/SearchVehiclePage';
import BookingHistoryPage from './pages/BookingHistoryPage';
import BookingPage from "./pages/BookingPage";
import RatingPage from "./pages/RatingPage";

const PrivateRoute = ({ element } : any) => {
    const context = useContext(AccountContext);

    return context?.isLoggedIn ? (
        element
    ) : (
        <Navigate to="/sign-in" replace />
    );
};

function App() {
    return (
        <AccountContextProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sign-up" element={<SignUpPage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute
                                element={<ProfilePage />}
                            />
                        }
                    />
                    <Route
                        path="/vehicle-search"
                        element={
                            <PrivateRoute
                                element={<SearchVehiclePage />}
                            />
                        }
                    />
                    <Route
                        path="/vehicle/:vehicleId/booking/:bookingId/status"
                        element={
                            <PrivateRoute
                                element={<BookingPage />}
                            />
                        }
                    />
                    <Route
                        path="/vehicle/:vehicleId/booking/:bookingId/rate"
                        element={
                            <PrivateRoute
                                element={<RatingPage />}
                            />
                        }
                    />
                    <Route
                        path="/booking-history"
                        element={
                            <PrivateRoute
                                element={<BookingHistoryPage />}
                            />
                        }
                    />
                </Routes>
            </BrowserRouter>
        </AccountContextProvider>
    );
}

export default App;
