import React from "react";
import {Container, Typography} from "@mui/material";
import ForgotPasswordform from "../Login/ForgotPasswordform";
import {motion} from "framer-motion";
import Logo from "../../Components/logo";
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import {fadeInUp} from '../../Effects/Animations';

const ForgotPassword = () => {

    return (
        <RootStyle className = 'Background'>
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