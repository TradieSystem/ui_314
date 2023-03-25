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
import PageContainer from "./Components/PageContainer/PageContainer";
import {AuthContextContextProvider} from "./Contexts/AuthContext";
import SignUp from "./Pages/SignUp/SignUp";


function App() {

    return (
        <NavigationContextContextProvider>
            <AuthContextContextProvider>
                <HashRouter>
                    <Routes>
                        <Route path={RoutesEnum.HOME} element={<HomePage/>}/>
                        {/*DELETE THIS - only for testing*/}
                        <Route
                            path={RoutesEnum.TEST}
                            element={
                                <PageContainer title={'Test page - delete'}>
                                    <>Some content</>
                                </PageContainer>
                            }
                        />
                        <Route path={RoutesEnum.LOGIN} element={<Login />}/>
                        <Route path={RoutesEnum.SIGN_UP} element={<SignUp />}/>
                        <Route path={RoutesEnum.User} element={<UserProfileDisplay />}/>
                        <Route path={'*'} element={<HomePage/>}/>
                    <Route path={"/ForgotPassword"} element={<ForgotPassword />}/>
                    <Route path={"/Password"} element={<Password />}/>
                </Routes>
            </HashRouter>
            </AuthContextContextProvider>
        </NavigationContextContextProvider>

    );
}

export default App;
