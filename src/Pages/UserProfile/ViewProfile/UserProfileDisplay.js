import React from "react";
import {Container} from "@mui/material";
import styled from "@emotion/styled";
import UserProfile from "./UserProfile";
import PageContainer from "../../../Components/PageContainer/PageContainer";

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


const UserProfileDisplay = () => {

    return (
        <PageContainer title={'Profile'}>
            <Container maxWidth="sm">
                <ContentStyle>
                    <UserProfile/>
                </ContentStyle>
            </Container>
        </PageContainer>
    );
};

export default UserProfileDisplay;