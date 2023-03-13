import React, { useState } from 'react';
import './App.css';
import {NavigationContextContextProvider} from "./Contexts/NavigationContext";
import {HomePage} from "./Pages/HomePage";
import Login from "./Pages/Login/Login";
import {RoutesEnum} from "./Routes";
import {HashRouter, Route, Routes} from "react-router-dom";
import PageContainer from "./Components/PageContainer/PageContainer";
function App() {
    const [auth, setAuth] = useState(false);



    return (
        <NavigationContextContextProvider>
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
                    <Route path={RoutesEnum.LOGIN} element={<Login setAuth={setAuth}/>} />
                    <Route path={RoutesEnum.LOGOUT} element={<Login setAuth={setAuth}/>} />
                    <Route path={'*'} element={<HomePage/>} />
                </Routes>
            </HashRouter>
        </NavigationContextContextProvider>
    );
}

export default App;
