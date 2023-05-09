import React from "react";
import {Container} from "@mui/material";
import CreateRequestForm from "./CreateRequestForm";
import styled from "@emotion/styled";
import {PageContainer} from '../../Components/PageContainer/PageContainer';


const ContentStyle = styled("div")({
    maxWidth: 480,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#f3d9ca",
    borderRadius: "25px"
});

const CreateRequest = () => {
    return (
        <PageContainer title={'Request Form'}>
            <Container maxWidth="sm">
                <ContentStyle>
                <CreateRequestForm/>
                    </ContentStyle>
            </Container>
        </PageContainer>
    );
};

export default CreateRequest;