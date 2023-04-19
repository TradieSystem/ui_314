import React from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import {UserType} from "../../Types/Account";
import {RequestHistoryTable} from "./RequestHistoryTables/RequestHistoryTable";
import {User} from "../../Types/User";

/**
 * A page to show the request history for both Professionals and Clients
 * This page conditionally renders the table displayed based on the {@link UserType} of the currently logged in {@link User}
 */
export const RequestHistory = (): JSX.Element => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;

    return (
        <PageContainer title={user?.userType === UserType.CLIENT ? 'My Requests' : 'Job History'}>
            <RequestHistoryTable/>
        </PageContainer>
    )
}