import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link} from "@mui/material";
import LoginForm from "../Login/LoginForm";
import { motion } from "framer-motion";
import Logo from "../../Components/logo";
import {easing} from '../../Effects/Animations';
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";

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

const Login = () => {

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                       <Logo />
                    </HeadingStyle>
                    <LoginForm />
                    <HeadingStyle>
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
                    </HeadingStyle>
                </ContentStyle>
            </Container>
        </RootStyle>




    );
};

export default Login;