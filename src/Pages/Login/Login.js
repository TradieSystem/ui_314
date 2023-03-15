import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box} from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../Login/LoginForm";
import { motion } from "framer-motion";
import Logo from "./logo";




const RootStyle = styled("div")({
    background: "rgb(8,124,241)",
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

const HeadingStyle = styled(Box)({
    textAlign: "center",
});

const ContentStyle = styled("div")({
    maxWidth: 600,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    background: "#eae4e4"
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

const Login = ({useAuthContext}) => {

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                       <Logo />
                        <Typography sx={{ color: "text.secondary", mb: 5 }}>
                            Login to your account
                        </Typography>
                    </HeadingStyle>

                    <LoginForm useAuthContext={useAuthContext}/>

                    <Typography
                        component={motion.p}
                        {...fadeInUp}
                        variant="body2"
                        align="left"
                        sx={{ mt: 3 }}
                    >
                        Don’t have an account?{" "}
                        <Link variant="subtitle2" component={RouterLink} to="/signup">
                            Sign up
                        </Link>
                    </Typography>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
};

export default Login;