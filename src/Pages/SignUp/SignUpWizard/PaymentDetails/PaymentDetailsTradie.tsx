import React, {useEffect, useState} from 'react';
import {SignUpFields, SignUpProps} from "../../SignUp";
import {ContentStyle, HeadingStyle, RootStyle} from "../../../../CommonStyles/SignUp_Login";
import {motion} from "framer-motion";
import {animate} from "../../../../Effects/Animations";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import {useFormikContext} from "formik";
import {UserType} from "../../../../Types/Account";
import {Icon} from "@iconify/react";
import {Alert, Box, Container, IconButton, InputAdornment, Typography} from "@mui/material";
import Logo from '../../../../Components/Logo2';
import Image from "./img_2.png";

export const PaymentDetailsTradie = ({setCurrentStep, handleSubmit}: SignUpProps) => {
    const {values, touched, getFieldProps, errors} = useFormikContext();
    const [showCVV, setShowCVV] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [alert, setAlert] = useState(<></>);

    function stepsComplete() {
        return (
            (errors as SignUpFields).incomingCCName === undefined &&
            (errors as SignUpFields).incomingCCCVV === undefined &&
            (errors as SignUpFields).incomingCCName === undefined &&
            (errors as SignUpFields).incomingCCExpiryMonth === undefined &&
            (errors as SignUpFields).incomingCCExpiryYear === undefined
        )
    }

    useEffect(() => {
        const enteredDate = new Date(`${(values as SignUpFields).incomingCCExpiryMonth}/28/${(values as SignUpFields).incomingCCExpiryYear}`);
        const currentDate = new Date();

        if(currentDate > enteredDate) {
            setAlert(
                <Alert
                    severity={"error"}
                >
                    Expiry should be a date in the future
                </Alert>
            )
        } else {
            setAlert(<></>);
        }
    }, [values]);

    return (
        <>
            <RootStyle style={{
                backgroundImage: `url(${Image})`,
                backgroundSize: "cover",
                color: "#f5f5f5",
                minHeight: "100vh",
                height: "100%",
            }}>
                <RootStyle style={{
                    height: "auto",
                    border: "2px solid #DB5B13",
                    padding: "20px",
                    background: "#f3d9ca",
                    borderRadius: "25px"
                }}>
                <Container maxWidth={"xs"}>
                    <ContentStyle>
                        <Box
                            component={motion.div}
                            animate={{
                                transition: {
                                    staggerChildren: 0.55
                                }
                            }}
                            sx={{marginTop: 2}}
                        >
                            {alert}
                            {
                                ((values as SignUpFields).userType === UserType.PROFESSIONAL) &&
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1.5,
                                        marginTop: 5
                                    }}
                                    component={motion.div}
                                    initial={{opacity: 0, y: 40}}
                                    animate={animate}
                                >
                                    <HeadingStyle>
                                        <Logo/>
                                    </HeadingStyle>
                                    <HeadingStyle>
                                    <Typography variant={'h3'}  style={{color:"black", fontSize:"30px",fontFamily:'Fahrenheit' }}>
                                        Incoming Payment Details
                                    </Typography>
                                     </HeadingStyle>
                                    <Typography
                                        align={'center'}
                                        variant={'subtitle1'}
                                        style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                    >
                                        Card details to receive payments:
                                    </Typography>
                                    <ThemedTextField
                                        fullWidth
                                        autoComplete="incoming cc name"
                                        label="Name"
                                        type="incomingCCName"
                                        required
                                        error={Boolean((touched as SignUpFields).incomingCCName && (errors as SignUpFields).incomingCCName)}
                                        helperText={(touched as SignUpFields).incomingCCName && (errors as SignUpFields).incomingCCName}
                                        {...getFieldProps("incomingCCName")}
                                    />
                                    <ThemedTextField
                                        fullWidth
                                        autoComplete="incoming cc number"
                                        type="incomingCCNumber"
                                        label="Card Number"
                                        size={"medium"}
                                        required
                                        error={Boolean((touched as SignUpFields).incomingCCNumber && (errors as SignUpFields).incomingCCNumber)}
                                        helperText={(touched as SignUpFields).incomingCCNumber && (errors as SignUpFields).incomingCCNumber}
                                        {...getFieldProps("incomingCCNumber")}
                                    />
                                    <ThemedTextField
                                        fullWidth
                                        autoComplete="incoming cvv"
                                        type={showCVV ? "text" : "password"}
                                        label="CVV"
                                        size={"medium"}
                                        required
                                        error={Boolean((touched as SignUpFields).incomingCCCVV && (errors as SignUpFields).incomingCCCVV)}
                                        helperText={(touched as SignUpFields).incomingCCCVV && (errors as SignUpFields).incomingCCCVV}
                                        {...getFieldProps("incomingCCCVV")}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        onClick={() => setShowCVV((prev) => !prev)}
                                                    >
                                                        {showCVV ? (
                                                            <Icon icon="eva:eye-fill"/>
                                                        ) : (
                                                            <Icon icon="eva:eye-off-fill"/>
                                                        )}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 1,
                                        }}
                                        component={motion.div}
                                        initial={{opacity: 0, y: 40}}
                                        animate={animate}
                                    >
                                        <Box>
                                            <ThemedTextField
                                                autoComplete="incoming CC ExpiryMonth"
                                                type="incomingCCExpiryMonth"
                                                label="Expiry Month"
                                                size={"small"}
                                                required
                                                error={Boolean((touched as SignUpFields).incomingCCExpiryMonth && (errors as SignUpFields).incomingCCExpiryMonth)}
                                                helperText={(touched as SignUpFields).incomingCCExpiryMonth && (errors as SignUpFields).incomingCCExpiryMonth}
                                                {...getFieldProps("incomingCCExpiryMonth")}
                                            />
                                        </Box>
                                        <Box>
                                            <ThemedTextField
                                                autoComplete="incoming CC Expiry Year"
                                                type="incomingCCExpiryYear"
                                                label="Expiry Year"
                                                size={"small"}
                                                required
                                                error={Boolean((touched as SignUpFields).incomingCCExpiryYear && (errors as SignUpFields).incomingCCExpiryYear)}
                                                helperText={(touched as SignUpFields).incomingCCExpiryYear && (errors as SignUpFields).incomingCCExpiryYear}
                                                {...getFieldProps("incomingCCExpiryYear")}
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                            }
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
                                    onClick={() => setCurrentStep(4)}
                                >
                                    Back
                                </ThemedButton>
                                <ThemedButton
                                    disabled={!stepsComplete() || submitting}
                                    onClick={() => {
                                        const enteredFields = values as SignUpFields;
                                        if (enteredFields && handleSubmit) {
                                            setSubmitting(true);
                                            handleSubmit(enteredFields);
                                        }
                                    }}
                                >
                                    Create Account
                                </ThemedButton>
                            </Box>
                        </Box>
                    </ContentStyle>
                </Container>
            </RootStyle>
            </RootStyle>
        </>
    )
}

export default PaymentDetailsTradie;