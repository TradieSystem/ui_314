import React from "react";
import {Box, Container, Typography} from "@mui/material";
import styled from "@emotion/styled";
import Passwordform from "../Login/PasswordForm";
import {motion} from "framer-motion";
import Logo from "../../Components/logo";
import {fadeInUp} from '../../Effects/Animations';

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

const Password = () => {

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                        <Logo />
                    </HeadingStyle>

                    <Passwordform />

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

export default Password;