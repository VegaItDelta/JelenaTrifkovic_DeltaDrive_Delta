import React, {createContext, FC, ReactNode, useEffect, useState} from "react";
import {AccountSignedIn, AccountSignedInSchema} from "../types/Account";
import { z } from 'zod';

const AccountContext = createContext<{
    isLoggedIn: boolean;
    account: AccountSignedIn | null;
    verifyAndSaveSession: (loggedAccount: AccountSignedIn | null) => boolean;
    logOut: () => void;
} | null>(null);

export const AccountContextProvider: FC<{ children: ReactNode }> = ({ children}) => {

    const [account, setAccount] = useState<AccountSignedIn | null>(null);

    useEffect(() => {
        const storedItem = localStorage.getItem('session');

        try {
            const obj = storedItem && JSON.parse(storedItem);
            const validatedData = AccountSignedInSchema.parse(obj);
            setAccount(validatedData);
        } catch (error) {

        }
    }, [])

    const isLoggedIn = !!localStorage.getItem('session');

    const verifyAndSaveSession = (loggedAccount: AccountSignedIn | null) => {
        try {
            const validatedData = AccountSignedInSchema.parse(loggedAccount);
            const jsonString = JSON.stringify(validatedData);
            localStorage.setItem('session', jsonString);
            setAccount(validatedData);
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                return false;
            }
            return false;
        }
    }

    const logOut = () => {
        localStorage.removeItem('session');
        setAccount(null);
    }

    return (
        <AccountContext.Provider value={{isLoggedIn, account, verifyAndSaveSession, logOut}}>
            {children}
        </AccountContext.Provider>
    );
};

export default AccountContext;
