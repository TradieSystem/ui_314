import React from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import AvailableRequestsTable from "./AvailableRequestsTable/AvailableRequestsTable";

/**
 * Page to display the available {@link ServiceRequest}s for a professionl {@link User} to pick up
 */
export const AvailableRequests = (): JSX.Element => {

    return (
        <PageContainer title={'Available Requests'}>
            <AvailableRequestsTable />
        </PageContainer>
    )
}

export default AvailableRequests;