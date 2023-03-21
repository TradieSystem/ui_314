import React from 'react';
import './App.css';
import {NavigationContextContextProvider} from "./Contexts/NavigationContext";
import {HomePage} from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import ForgotPassword from "./Pages/Login/ForgotPassword";
import Password from "./Pages/Login/Password";
import {RoutesEnum} from "./Routes";
import {HashRouter, Route, Routes} from "react-router-dom";
import PageContainer from "./Components/PageContainer/PageContainer";
import { AuthProvider } from './Contexts/auth0';


function App() {

    // @ts-ignore
    return (
        <NavigationContextContextProvider>
            <AuthProvider>
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
                    <Route path={RoutesEnum.LOGOUT} element={ <Login />}/>
                    <Route path={'*'} element={<HomePage/>} />
                    <Route path={"/ForgotPassword"} element={ <ForgotPassword />}/>
                    <Route path={"/Password"} element={ <Password />}/>
                </Routes>
            </HashRouter>
            </AuthProvider>
        </NavigationContextContextProvider>

    );
}

export default App;
