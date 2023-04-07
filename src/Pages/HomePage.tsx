import React from 'react';
import PageContainer from "../Components/PageContainer/PageContainer";
import {useAuthContext} from "../Contexts/AuthContext";


/**
 * The {@link HomePage} of the application
 */
export const HomePage = () => {
    const {user} = useAuthContext();
    return (
        <PageContainer title={'Home'} subtitle={user ? `${user.firstName} ${user.lastName}` : ''}>
           <></>
        </PageContainer>
    )
}

export default HomePage;