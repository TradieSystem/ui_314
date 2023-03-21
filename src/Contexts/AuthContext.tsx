import React, {createContext, useContext, useState} from 'react';
import {User} from "../Types/User";

const AuthContext = createContext({} as AuthContextState);

/**
 * Attributes to describe the AuthContextState
 */
interface AuthContextState{
    /**
     * Logged in user (optional), will be populated on login
     */
    user?: User;
    setUser?: (user: User) => void;
    /**
     * Auth token will be received on successful login, and used for all requests
     */
    authToken?: string;
    setAuthToken?: (token: string) => void;

    /**
     * Refresh token will be used to submit a request for a new auth token before expiry
     */
    refreshToken?: string;
    setRefreshToken?: (token: string) => void;
}

export const AuthContextContextProvider = ({children}: any) => {
    /**
     * Current state of user
     */
    const [user, setUser] = useState<User | undefined>();
    const [authToken, setAuthToken] = useState<string | undefined>();
    const [refreshToken, setRefreshToken] = useState<string | undefined>();

    const value : AuthContextState = {
        user,
        setUser,
        authToken,
        setAuthToken,
        refreshToken,
        setRefreshToken
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);