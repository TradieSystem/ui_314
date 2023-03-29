import React from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import {useAuthContext} from "../../Contexts/AuthContext";
import {UserType} from "../../Types/Account";
import {ClientRequestHistory} from "./RequestHistoryTables/ClientRequestHistory/ClientRequestHistory";
import {ProfessionalRequestHistory} from "./RequestHistoryTables/ProfessionalRequestHistory";

/**
 * A page to show the request history for both Professionals and Clients
 * This page conditionally renders the table displayed based on the {@link UserType} of the currently logged in {@link User}
 */
export const RequestHistory = (): JSX.Element => {
    const {user} = useAuthContext();

    return (
        <PageContainer title={user?.usertype === UserType.CLIENT ? 'My Requests' : 'Job History'}>
            {/*Conditionally render the table based on the user type*/}
            {user?.usertype === UserType.CLIENT ?
                <ClientRequestHistory /> :
                <ProfessionalRequestHistory />
            }
        </PageContainer>
    )
}