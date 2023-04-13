import React from 'react';
import PageContainer from "../Components/PageContainer/PageContainer";
import {User} from "../Types/User";


/**
 * The {@link HomePage} of the application
 */
export const HomePage = () => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    return (
        <PageContainer title={'Home'} subtitle={user ? `${user.firstName} ${user.lastName}` : ''}>
            <></>
        </PageContainer>
    )
}

export default HomePage;