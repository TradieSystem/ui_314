import React from 'react';
import './App.css';
import {NavigationContextContextProvider} from "./Contexts/NavigationContext";
import {HomePage} from "./Pages/HomePage";
import {RoutesEnum} from "./Routes";
<<<<<<< Updated upstream
import {MemoryRouter, Route, Routes} from "react-router-dom";
=======
import Login from "./Login/Login";
import {HashRouter, Route, Routes} from "react-router-dom";
>>>>>>> Stashed changes
import PageContainer from "./Components/PageContainer/PageContainer";
function App() {
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
                    <Route path={RoutesEnum.LOGIN} element={<Login />} />
                </Routes>
            </HashRouter>
        </NavigationContextContextProvider>
    );
}

export default App;



