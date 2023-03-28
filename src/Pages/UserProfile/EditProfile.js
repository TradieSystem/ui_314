import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box} from "@mui/material";
import styled from "@emotion/styled";
import EditProfileForm from "../UserProfile/EditProfileForm";
import { motion } from "framer-motion";
import Logo from "../../Components/logo";



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



let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: { duration: 0.6, ease: easing },
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: easing,
        },
    },
};

const EditProfile = () => {

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle style={{ text: "100px" ,textAlign:"center"}} >
                             <h1>Edit User</h1>
                </HeadingStyle>
                    <EditProfileForm />
                    <Typography
                        component={motion.p}
                        {...fadeInUp}
                        variant="body2"
                        align="left"
                        sx={{ mt: 3 }}
                    >
                    </Typography>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
};

export default EditProfile;