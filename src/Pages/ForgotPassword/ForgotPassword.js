import React from "react";
import {Container, Typography} from "@mui/material";
import ForgotPasswordform from "./ForgotPasswordform";
import {motion} from "framer-motion";
import Logo from "../../Components/logo";
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import {fadeInUp} from '../../Effects/Animations';
import Image from "./img_2.png";

const ForgotPassword = () => {

    return (
        <RootStyle style={{
            backgroundImage: 'url(' + Image + ')',
            backgroundSize: "cover",
            color: "#0c0c0c",
            minHeight: "100vh",
            height: "100%"
        }}>
            <RootStyle style={{
                height: "700px",
                borderRadius: "25px",
                border: "2px solid #DB5B13",
                padding: "20px",
            }}>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle component={motion.div} {...fadeInUp} style={{color:"black", fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold'}}>
                            T-Titans
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