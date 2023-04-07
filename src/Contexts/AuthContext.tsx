import React, {createContext, useContext, useState} from 'react';
import {User} from "../Types/User";
import {MembershipOption, UserType} from "../Types/Account";

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

//TODO REMOVE THESE WHEN BACKEND WORKING -- pass whichever is needed into the initial state of user/setUser useState
const dummyClientUser : User = {
    userId: 1,
    firstName: "Adam",
    lastName: "Adams",
    email: "adam@adam.com",
    password: "adam",
    address: {
        streetNumber: "1",
        streetName: "Adamson Street",
        postcode: "2170",
        suburb: "Liverpool"
    },
    mobile: "0411222333",
    userType: UserType.CLIENT,
    client: {
        membershipType: MembershipOption.PAY_AS_YOU_GO
    },
}

export const dummyProfessionalUser : User = {
    userId: 2,
    firstName: "Bob",
    lastName: "Bobby",
    email: "bob@bob.com",
    password: "bob",
    address: {
        streetNumber: "2",
        streetName: "Bobby Street",
        postcode: "2170",
        suburb: "Liverpool"
    },
    mobile: "0499888777",
    userType: UserType.PROFESSIONAL
}

export const AuthContextContextProvider = ({children}: any) => {
    /**
     * Current state of user
     */
    const [user, setUser] = useState<User | undefined>(dummyClientUser); //edit this as needed between dummyClientUser and dummyProfessionalUser
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