import React from 'react';
import './App.css';
import {NavigationContextContextProvider} from "./Contexts/NavigationContext";
import {HomePage} from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import {RoutesEnum} from "./Routes";
import {HashRouter, Route, Routes} from "react-router-dom";
import PageContainer from "./Components/PageContainer/PageContainer";
import { AuthContextContextProvider } from "./Contexts/auth0";
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
                    <Route path={RoutesEnum.LOGOUT} element={<Login useAuthContext/>} />
                    <Route path={'*'} element={<HomePage/>} />
                </Routes>
            </HashRouter>
                </AuthContextContextProvider>
        </NavigationContextContextProvider>
    );
}

export default App;
