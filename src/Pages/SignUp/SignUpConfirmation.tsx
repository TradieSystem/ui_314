import React from 'react';
import {Box, Container, Typography} from "@mui/material";
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import {motion} from "framer-motion";
import {animate} from "../../Effects/Animations";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import {RoutesEnum} from "../../Routes";
import {User} from "../../Types/User";
import {useNavigate} from "react-router-dom";

export interface SignUpConfirmationProps {
    /**
     * The {@link User} that was created as a part of {@link SignUp}
     */
    createdUser: User;
}

/**
 * Component to show the confirmation details for a created {@link User}
 */
export const SignUpConfirmation = ({createdUser} : SignUpConfirmationProps) => {
    const navigate = useNavigate();

    return (
        <RootStyle>
            <Container maxWidth={"xs"}>
                <HeadingStyle>
                    <Typography variant={'h3'}>
                        Account Created
                    </Typography>
                </HeadingStyle>
                <ContentStyle>
                    <Box
                        component={motion.div}
                        animate={{
                            transition: {
                                staggerChildren: 0.55
                            }
                        }}
                        sx={{
                            padding: 3,
                            borderRadius: "20px",
                            background: "#d9c8c6",
                            border: "2px solid #DB5B13",
                            marginBottom: 3
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                            }}
                            component={motion.div}
                            initial={{opacity: 0, y: 40}}
                            animate={animate}
                        >
                            An account has successfully been created with the following details:
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                }}
                                component={motion.div}
                                initial={{opacity: 0, y: 40}}
                                animate={animate}
                            >
                                <b>Account Type:</b>
                                {createdUser.professional ? 'Professional' : 'Client'}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                }}
                                component={motion.div}
                                initial={{opacity: 0, y: 40}}
                                animate={animate}
                            >
                                <b>Email:</b>
                                {createdUser.email}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                }}
                                component={motion.div}
                                initial={{opacity: 0, y: 40}}
                                animate={animate}
                            >
                                <b>Name:</b>
                                {`${createdUser.firstName} ${createdUser.lastName}`}
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 1,
                                }}
                                component={motion.div}
                                initial={{opacity: 0, y: 40}}
                                animate={animate}
                            >
                                <b>Contact Number:</b>
                                {createdUser.mobile}
                            </Box>
                        </Box>
                    </Box>
                    <ThemedButton
                        onClick={() => navigate('/' + RoutesEnum.LOGIN)}
                    >
                        Proceed to Login
                    </ThemedButton>
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default SignUpConfirmation;