import React, {CSSProperties, FC, useContext, useState} from 'react';
import {Alert, Box, Button, TextField, Typography} from "@mui/material";
import {AccountFormData, AccountFormDataSchema} from "../types/Account";
import {signUp} from "../api/account";
import AccountContext from "../contexts/AccountContext";
import {z} from "zod";
import {useNavigate} from "react-router-dom";

const styles: CSSProperties = {display: "flex", flexDirection: "column", gap: '1em', padding: '1em', margin: '1em'};

const SignUpForm: FC<{}> = () => {
    const navigate = useNavigate();
    const [account, setAccount] = useState<AccountFormData>({
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        password: '',
    });

    const [error, setError] = useState<string | null>(null);

    const accountContext = useContext(AccountContext);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setError(null);
        setAccount(prev => ({...prev, [e.target.name]: e.target.value}));
    }

    const onSubmit = async () => {
        try {
            const validatedData = AccountFormDataSchema.parse(account);

            const res = await signUp(validatedData);
            const verified = accountContext?.verifyAndSaveSession(res?.data);
            if (verified) {
                navigate('/profile');
            } else {
                setError("Something went wrong! Not logged in!");
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                setError("Invalid! Check data you entered!");
            }
            setError("Invalid! Data not submitted!");
        }
    };

    return (
        <Box style={styles}>
            <Typography variant="h4">Passenger, please Sign Up!</Typography>
            {!!error && (
                <Alert severity="error">
                    {error}
                </Alert>
            )}
            <TextField
                name="firstName"
                label="First Name"
                value={account?.firstName}
                onChange={onChange}
                required
                autoComplete="off"
                helperText={!!error && !account?.firstName ? "Required!" : "This field is required"}
                error={!!error && !account?.firstName}
            />
            <TextField
                name="lastName"
                label="Last Name"
                value={account?.lastName}
                onChange={onChange}
                required
                autoComplete="off"
                helperText={!!error && !account?.lastName ? "Required!" : "This field is required"}
                error={!!error && !account?.lastName}
            />
            <TextField
                name="birthday"
                label="Birthday"
                value={account?.birthday}
                onChange={onChange}
                required
                autoComplete="off"
                helperText={!!error && !account?.birthday ? "Required!" : "This field is required"}
                error={!!error && !account?.birthday}
            />
            <TextField
                name="email"
                label="Email"
                value={account?.email}
                onChange={onChange}
                type="email"
                required
                autoComplete="off"
                helperText={!!error && !account?.email ? "Required!" : "This field is required"}
                error={!!error && !account?.email}
            />
            <TextField
                name="password"
                label="Password"
                value={account?.password}
                onChange={onChange}
                type="password"
                required
                autoComplete="off"
                helperText={!!error && !account?.password ? "Required!" : "This field is required"}
                error={!!error && !account?.password}
            />
            <Button variant="contained" onClick={onSubmit}>
                Sign up
            </Button>
        </Box>
    );
}

export default SignUpForm;