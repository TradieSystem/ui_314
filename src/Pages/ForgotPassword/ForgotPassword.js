import React from "react";
import {Container, Typography} from "@mui/material";
import ForgotPasswordform from "./ForgotPasswordform";
import {motion} from "framer-motion";
import Logo from "../../Components/logo";
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import {fadeInUp} from '../../Effects/Animations';
import Image from "./Background.jpg";

const ForgotPassword = () => {

    return (
        <RootStyle style={{
            backgroundImage: 'url(' + Image + ')',
            backgroundSize: "cover",
            height: "100vh",
            color: "#0c0c0c",
        }}>
            <RootStyle style={{
                height: "900px",
                borderRadius: "25px",
                border: "2px solid #DB5B13",
                padding: "20px",
            }}>
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
        </RootStyle>
    );
};

export default ForgotPassword;