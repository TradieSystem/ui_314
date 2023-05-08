import React from "react";
import {Link as RouterLink} from "react-router-dom";
import {Container, Link, Stack, Typography} from "@mui/material";
import LoginForm from "../Login/LoginForm";
import {motion} from "framer-motion";
import Logo from "../../Components/logo";
import {fadeInUp} from '../../Effects/Animations';
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import Image from "./img_2.png";


const Login = () => {

    return (
        <RootStyle style={{
            backgroundImage: `url(${Image})`,
            backgroundSize: "cover",
            color: "#f5f5f5",
            minHeight: "100vh",
            height: "100%",
        }}>
            <RootStyle style={{
                height: "700px",
                border: "2px solid #DB5B13",
                padding: "20px",
                borderRadius: "25px"
            }}>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle component={motion.div} {...fadeInUp} style={{color:"black", fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>
                            T-Titans
                            <Logo/>
                        </HeadingStyle>
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{my: 2}}
                        >
                        </Stack>
                        <LoginForm/>
                        <HeadingStyle>
                            <Typography
                                component={motion.p}
                                {...fadeInUp}
                                variant="body2"
                                align="left"
                                sx={{mt: 3}}
                            >
            <span style={{color: "black"}}>
              Don’t have an account?{" "}
            </span>
                                <Link variant="subtitle2" component={RouterLink} to="/signup">
                                    Sign up
                                </Link>
                            </Typography>
                        </HeadingStyle>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </RootStyle>
    );
};

export default Login;