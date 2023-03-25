import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link} from "@mui/material";
import { motion } from "framer-motion";
import ClientRequestForm from "./ClientRequestForm"
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

const ClientRequest = () => {
    return (

    <RootStyle>
            <Container maxWidth="sm">
                <ContentStyle>
                    <HeadingStyle component={motion.div} {...fadeInUp}>
                       <h1>Request Form</h1>
                    </HeadingStyle>
                    <ClientRequestForm />
                </ContentStyle>
            </Container>
        </RootStyle>




    );
};

export default ClientRequest;