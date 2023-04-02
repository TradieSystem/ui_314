import React, {useState} from 'react';
import {SignUpFields, SignUpProps} from "../../SignUp";
import {Box, Container, IconButton, InputAdornment, Typography} from "@mui/material";
import {ContentStyle, HeadingStyle, RootStyle} from "../../../../CommonStyles/SignUp_Login";
import {motion} from "framer-motion";
import {animate} from "../../../../Effects/Animations";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import {useFormikContext} from "formik";
import {UserType} from "../../../../Types/Account";
import {Icon} from "@iconify/react";

export const PaymentDetails = ({setCurrentStep, handleSubmit} : SignUpProps) => {
    const {values, touched, getFieldProps, errors} = useFormikContext();
    const [showCVV, setShowCVV] = useState(false);


    function stepsComplete() {
        return (
            (errors as SignUpFields).outgoingCCName === undefined &&
            (errors as SignUpFields).outgoingCCCVV === undefined &&
            (errors as SignUpFields).outgoingCCNumber === undefined
        )
    }

    return (
        <>
            <RootStyle>
                <Container maxWidth={"xs"}>
                    <HeadingStyle>
                        <Typography variant={'h3'}>
                            Outgoing Payment Details
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
                                    autoComplete="outgoing cc name"
                                    label="Name"
                                    type="outgoingCCName"
                                    required
                                    error={Boolean((touched as SignUpFields).outgoingCCName && (errors as SignUpFields).outgoingCCName)}
                                    helperText={(touched as SignUpFields).outgoingCCName && (errors as SignUpFields).outgoingCCName && "Name is required"}
                                    {...getFieldProps("outgoingCCName")}
                                />
                                <ThemedTextField
                                    fullWidth
                                    autoComplete="outgoing cc number"
                                    type="outgoingCCNumber"
                                    label="Card Number"
                                    size={"medium"}
                                    required
                                    error={Boolean((touched as SignUpFields).outgoingCCNumber && (errors as SignUpFields).outgoingCCNumber)}
                                    helperText={(touched as SignUpFields).outgoingCCNumber && (errors as SignUpFields).outgoingCCNumber && "Card number is required"}
                                    {...getFieldProps("outgoingCCNumber")}
                                />
                                <ThemedTextField
                                    fullWidth
                                    autoComplete="outgoingCCCVV"
                                    type={showCVV ? "text" : "password"}
                                    label="CVV"
                                    size={"medium"}
                                    required
                                    error={Boolean((touched as SignUpFields).outgoingCCCVV && (errors as SignUpFields).outgoingCCCVV)}
                                    helperText={(touched as SignUpFields).outgoingCCCVV && (errors as SignUpFields).outgoingCCCVV && "CVV is required"}
                                    {...getFieldProps("outgoingCCCVV")}
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
                                    onClick={() => setCurrentStep(3)}
                                >
                                    Back
                                </ThemedButton>
                                <ThemedButton
                                    disabled={!stepsComplete()}
                                    onClick={() => {
                                        if((values as SignUpFields).userType === UserType.CLIENT) {
                                            const enteredFields = values as SignUpFields;
                                            if(enteredFields && handleSubmit) {
                                                handleSubmit(enteredFields);
                                            }
                                        } else {
                                            setCurrentStep(5);
                                        }
                                    }}
                                >
                                    {(values as SignUpFields).userType === UserType.CLIENT ? `Create Account` : 'Next'}
                                </ThemedButton>
                            </Box>
                        </Box>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </>
    )
}

export default PaymentDetails;