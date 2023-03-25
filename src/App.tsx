import React from 'react';
import './App.css';
import {NavigationContextContextProvider} from "./Contexts/NavigationContext";
import {HomePage} from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import UserProfileDisplay from "./Pages/UserProfile/UserProfileDisplay";
import ClientRequest from "./Pages/ClientRequest/ClientRequest"
import ForgotPassword from "./Pages/Login/ForgotPassword";
import Password from "./Pages/Login/Password";
import {RoutesEnum} from "./Routes";
import {HashRouter, Route, Routes} from "react-router-dom";
import {AuthContextContextProvider} from "./Contexts/AuthContext";
import SignUp from "./Pages/SignUp/SignUp";


function App() {
    return (
        <AuthContextContextProvider>
            <NavigationContextContextProvider>
                <HashRouter>
                    <Routes>
                        <Route path={RoutesEnum.HOME} element={<HomePage/>}/>
                        <Route path={RoutesEnum.LOGIN} element={<Login/>}/>
                        <Route path={RoutesEnum.SIGN_UP} element={<SignUp/>}/>
                        <Route path={RoutesEnum.User} element={<UserProfileDisplay />}/>
                        <Route path={RoutesEnum.Request} element={<ClientRequest />}/>
                        <Route path={'*'} element={<HomePage/>}/>
                        <Route path={"/ForgotPassword"} element={<ForgotPassword/>}/>
                        <Route path={"/Password"} element={<Password/>}/>
                    </Routes>
                </HashRouter>
            </NavigationContextContextProvider>
        </AuthContextContextProvider>
    );
}

export default App;
