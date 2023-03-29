import React from "react";
import {Box, Container, Typography} from "@mui/material";
import styled from "@emotion/styled";
import EditProfileForm from "../UserProfile/EditProfileForm";
import {motion} from "framer-motion";
import {fadeInUp} from '../../Effects/Animations';
import {PageContainer} from '../../Components/PageContainer/PageContainer';

const RootStyle = styled("div")({
    background: "rgb(216,206,205)",
    height: "100vh",
    placeItems: "center",
    display: "grid",

});

const HeadingStyle = styled(Box)({
    textAlign: "center",
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

const EditProfile = () => {

    return (
        <PageContainer title={''}>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle style={{text: "100px", textAlign: "center"}}>
                            <h1>Edit User</h1>
                        </HeadingStyle>
                        <EditProfileForm/>
                        <Typography
                            component={motion.p}
                            {...fadeInUp}
                            variant="body2"
                            align="left"
                            sx={{mt: 3}}
                        >
                        </Typography>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </PageContainer>
    );
};

export default EditProfile;