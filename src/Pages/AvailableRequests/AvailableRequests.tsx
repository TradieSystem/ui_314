import React from 'react';
import PageContainer from "../../Components/PageContainer/PageContainer";
import AvailableRequestsTable from "./AvailableRequestsTable/AvailableRequestsTable";
import {Box} from "@mui/material";
import {motion} from "framer-motion";
import {fadeInUp} from "../../Effects/Animations";

/**
 * Page to display the available {@link ServiceRequest}s for a professionl {@link User} to pick up
 */
export const AvailableRequests = (): JSX.Element => {

    return (
        <PageContainer title={'Available Requests'}>
            <Box
                component={motion.div}
                {...fadeInUp}
            >
                <AvailableRequestsTable/>
            </Box>
        </PageContainer>
    );
}

export default AvailableRequests;