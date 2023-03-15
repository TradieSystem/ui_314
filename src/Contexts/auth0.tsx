import React, {createContext, useContext, useState} from 'react';

const AuthContext = createContext({} as AuthContextState);

interface AuthContextState{

   user: boolean;
    token: boolean;


}

export const AuthContextContextProvider = ({children}: any) => {
    /**
     * Current state of user
     */
    const [user, setUser] = useState<boolean>(false);
    const [token, setToken] = useState<boolean>(false);


    const value = {
        user,
        setUser,
        token,
        setToken

    }

    // @ts-ignore
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuthContext = () => useContext(AuthContext);