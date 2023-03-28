import React from "react";
import {Container} from "@mui/material";
import styled from "@emotion/styled";
import UserProfile from "./UserProfile";

const RootStyle = styled("div")({
    background: "rgb(216,206,205)",
    height: "100vh",
    placeItems: "center",
    display: "grid",

});

const ContentStyle = styled("div")({
    maxWidth: 480,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#d8cecd",
});


const UserProfileDisplay = () => {

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <UserProfile />
                </ContentStyle>
            </Container>
        </RootStyle>




    );
};

export default UserProfileDisplay ;