import { useContext, useState, useEffect, createContext} from 'react';


// create a context for authentication
// @ts-ignore
const AuthContext = createContext<{token: Token | null| undefined, user: User | null | undefined }>({
    token: null,
    user: null,

});

export const AuthProvider = ({children}: any) => {
    // @ts-ignore
    const [user, setUser] = useState<User>()
    const [token, setToken] = useState<string>(" ")

    const value = {
        token,
        user

    };

    // use a provider to pass down the value
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// export the useAuth hook
export const useAuth = () => {
    return useContext(AuthContext);
};

