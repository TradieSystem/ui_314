import React from 'react';
import './App.css';
import {NavigationContextContextProvider} from "./Contexts/NavigationContext";
import {HomePage} from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import UserProfileDisplay from "./Pages/UserProfile/UserProfileDisplay";
import CreateRequest from "./Pages/CreateRequest/CreateRequest"
import Password from "./Pages/ForgotPassword/Password";
import {RoutesEnum} from "./Routes";
import {HashRouter, Route, Routes} from "react-router-dom";
import {AuthContextContextProvider} from "./Contexts/AuthContext";
import SignUp from "./Pages/SignUp/SignUp";
import EditProfile from './Pages/UserProfile/EditProfile';
import {RequestHistory} from "./Pages/RequestHistory/RequestHistory";
import ProfessionalProfileDisplay from "./Pages/ProfessionalProfile/ProfessionalProfileDisplay";
import {AvailableRequests} from "./Pages/AvailableRequests/AvailableRequests";

function App() {
    return (
        <AuthContextContextProvider>
            <NavigationContextContextProvider>
                <HashRouter>
                    <Routes>
                        <Route path={RoutesEnum.HOME} element={<HomePage/>}/>
                        <Route path={RoutesEnum.LOGIN} element={<Login/>}/>
                        <Route path={RoutesEnum.SIGN_UP} element={<SignUp/>}/>
                        <Route path={RoutesEnum.USER_MANAGEMENT} element={<UserProfileDisplay />}/>
                        <Route path={RoutesEnum.REQUEST_HISTORY} element={<RequestHistory />}/>
                        <Route path={RoutesEnum.CREATE_REQUEST} element={<CreateRequest />} />
                        <Route path={RoutesEnum.AVAILABLE_REQUESTS} element={<AvailableRequests />} />
                        <Route path={RoutesEnum.PASSWORD} element={<Password/>}/>
                        <Route path={RoutesEnum.EDIT_PROFILE} element={<EditProfile/>}/>
                        <Route path={RoutesEnum.Pro_Profile} element={<ProfessionalProfileDisplay />}/>
                        <Route path={'*'} element={<Login/>}/>
                    </Routes>
                </HashRouter>
            </NavigationContextContextProvider>
        </AuthContextContextProvider>
    );
}

export default App;
