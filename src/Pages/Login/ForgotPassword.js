import React from "react";
import {Container, Typography} from "@mui/material";
import ForgotPasswordform from "../Login/ForgotPasswordform";
import {motion} from "framer-motion";
import Logo from "../../Components/logo";
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import {easing} from '../../Effects/Animations';

const fadeInUp = {
    initial: {
        y: 60,
        opacity: 0,
        transition: {duration: 0.6, ease: easing},
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

const ForgotPassword = () => {

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                        <Logo/>
                    </HeadingStyle>

                    <ForgotPasswordform/>

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


    );
};

export default ForgotPassword;