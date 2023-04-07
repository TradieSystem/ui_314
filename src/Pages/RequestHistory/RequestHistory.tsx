import React from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import {useAuthContext} from "../../Contexts/AuthContext";
import {UserType} from "../../Types/Account";
import {RequestHistoryTable} from "./RequestHistoryTables/RequestHistoryTable";

/**
 * A page to show the request history for both Professionals and Clients
 * This page conditionally renders the table displayed based on the {@link UserType} of the currently logged in {@link User}
 */
export const RequestHistory = (): JSX.Element => {
    const {user} = useAuthContext();

    return (
        <PageContainer title={user?.userType === UserType.CLIENT ? 'My Requests' : 'Job History'}>
            <RequestHistoryTable />
        </PageContainer>
    )
}