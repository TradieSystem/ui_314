import React, {useEffect, useState} from 'react';
import {motion} from "framer-motion";
import {Alert, Box, Container, IconButton, InputAdornment} from "@mui/material";
import {animate} from "../../../Effects/Animations";
import {Icon} from "@iconify/react";
import {useFormikContext} from "formik";
import {ContentStyle, HeadingStyle, RootStyle} from "../../../CommonStyles/SignUp_Login";
import {ThemedTextField} from "../../../Components/TextField/ThemedTextField";
import Logo from "../../../Components/logo";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {useNavigate} from "react-router-dom";
import {DEV_PATH, RoutesEnum} from "../../../Routes";
import {SignUpFields, SignUpProps} from "../SignUp";
import axios from "axios";

export const UserDetails = ({setCurrentStep}: SignUpProps) => {
    const [showPassword, setShowPassword] = useState(false);
    const [emailAvailable, setEmailAvailable] = useState(false);
    const [alert, setAlert] = useState(<></>);
    const navigate = useNavigate();

    const {errors, values, touched, getFieldProps, setFieldValue} = useFormikContext();

    useEffect(() => {
        if((values as SignUpFields).email !== "" && (errors as SignUpFields).email === undefined) {
            //Check if email is available
            axios
                .get((`${DEV_PATH}/user/validate?email=${(values as SignUpFields).email}`), {
                    headers: {
                        'content-type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                    },
                })
                .then((response) => {
                    //If the email is available, store the PK to encrypt the CC details
                    if(response.data) {
                        //'exists' is the property to say the username already exists
                        if(response.data.exists === "False") {
                            //set the PK that is used to encrypt the cc details
                            setFieldValue('ccPK', response.data.pbkey);
                            setEmailAvailable(true);
                            setAlert(<></>);
                        } else {
                            setEmailAvailable(false);
                            throw new Error('Email is taken');
                        }
                    }
                })
                .catch(() => {
                    setEmailAvailable(false);
                    setAlert(
                        <Alert severity={'error'}>
                            Email is already taken. Please choose a different email.
                        </Alert>
                    )
                });
        }
    }, [errors, values])

    function stepsComplete() {
        return (
            ((errors as SignUpFields).firstname === undefined) &&
            ((errors as SignUpFields).lastname === undefined) &&
            ((errors as SignUpFields).email === undefined) &&
            ((errors as SignUpFields).mobile === undefined) &&
            ((values as SignUpFields).firstname !== "") &&
            ((values as SignUpFields).lastname !== "") &&
            ((values as SignUpFields).email !== "") &&
            ((values as SignUpFields).mobile !== "") &&
            emailAvailable
        );
    }

    function emailValid() {
        return !(errors as SignUpFields).email;
    }

    function mobileValid() {
        return !(errors as SignUpFields).mobile;
    }

    return (
        <RootStyle>
            <Container maxWidth={"xs"}>
                <HeadingStyle>
                    <Logo/>
                </HeadingStyle>
                <ContentStyle>
                    {alert}
                    <Box
                        component={motion.div}
                        animate={{
                            transition: {
                                staggerChildren: 0.55
                            }
                        }}
                        sx={{marginTop: 2}}
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
                            <ThemedTextField
                                fullWidth
                                autoComplete="first name"
                                type="firstname"
                                label="First Name"
                                size={"medium"}
                                required
                                error={Boolean((touched as SignUpFields).firstname && (errors as SignUpFields).firstname)}
                                helperText={(touched as SignUpFields).firstname && (errors as SignUpFields).firstname}
                                {...getFieldProps("firstname")}
                            />
                            <ThemedTextField
                                fullWidth
                                autoComplete="last name"
                                type="lastname"
                                label="Last Name"
                                required
                                error={Boolean((touched as SignUpFields).lastname && (errors as SignUpFields).lastname)}
                                helperText={(touched as SignUpFields).lastname && (errors as SignUpFields).lastname}
                                {...getFieldProps("lastname")}
                            />
                            <ThemedTextField
                                fullWidth
                                autoComplete="email"
                                type="email"
                                label="Email Address"
                                required
                                error={Boolean((touched as SignUpFields).email && (errors as SignUpFields).email)}
                                helperText={(touched as SignUpFields).email && (errors as SignUpFields).email}
                                {...getFieldProps("email")}
                            />
                            <ThemedTextField
                                fullWidth
                                autoComplete="current-password"
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                required
                                error={Boolean((touched as SignUpFields).password && (errors as SignUpFields).password)}
                                helperText={(touched as SignUpFields).password && (errors as SignUpFields).password}
                                {...getFieldProps("password")}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword((prev) => !prev)}
                                            >
                                                {showPassword ? (
                                                    <Icon icon="eva:eye-fill"/>
                                                ) : (
                                                    <Icon icon="eva:eye-off-fill"/>
                                                )}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <ThemedTextField
                                fullWidth
                                autoComplete="mobile"
                                type="mobile"
                                label="Mobile"
                                required
                                error={Boolean((touched as SignUpFields).mobile && (errors as SignUpFields).mobile)}
                                helperText={(touched as SignUpFields).mobile && (errors as SignUpFields).mobile}
                                {...getFieldProps("mobile")}
                            />
                        </Box>
                        <Box
                            component={motion.div}
                            initial={{opacity: 0, y: 20}}
                            animate={animate}
                            marginTop={3}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        >
                            <ThemedButton
                                onClick={() => navigate('/' + RoutesEnum.LOGIN)}
                            >
                                Cancel
                            </ThemedButton>
                            <ThemedButton
                                disabled={!stepsComplete() || !emailValid() || !mobileValid()}
                                onClick={() => {
                                    if(stepsComplete() && emailValid() && mobileValid()) {
                                        //Clear alerts
                                        setAlert(<></>);

                                        setCurrentStep(1);
                                    } else {
                                        if(!emailValid()) {
                                            setAlert(
                                                <Alert severity={"error"}>
                                                    {(errors as SignUpFields).email}
                                                </Alert>
                                            );
                                        } else if(!mobileValid()) {
                                            setAlert(
                                                <Alert severity={"error"}>
                                                    {(errors as SignUpFields).mobile}
                                                </Alert>
                                            );
                                        } else {
                                            setAlert(
                                                <Alert severity={"error"}>
                                                    Please enter values for all fields
                                                </Alert>
                                            );
                                        }
                                    }
                                }}
                            >
                                Next
                            </ThemedButton>
                        </Box>
                    </Box>
                </ContentStyle>
            </Container>
        </RootStyle>
    )
}

export default UserDetails;