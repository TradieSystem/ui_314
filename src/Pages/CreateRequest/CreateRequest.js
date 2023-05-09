import React from "react";
import {Container} from "@mui/material";
import CreateRequestForm from "./CreateRequestForm"
import {PageContainer} from '../../Components/PageContainer/PageContainer'

const CreateRequest = () => {
    return (
        <PageContainer title={'Request Form'}>
            <Container maxWidth="sm" >
                <CreateRequestForm/>
            </Container>
        </PageContainer>
    );
};

export default CreateRequest;