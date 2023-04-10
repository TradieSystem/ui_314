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
    const [submitting, setSubmitting] = useState(false);

    function stepsComplete() {
        return (
            (errors as SignUpFields).outgoingCCName === undefined &&
            (errors as SignUpFields).outgoingCCCVV === undefined &&
            (errors as SignUpFields).outgoingCCNumber === undefined &&
            (errors as SignUpFields).outgoingCCExpiryMonth === undefined &&
            (errors as SignUpFields).outgoingCCExpiryYear === undefined
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
                                    helperText={(touched as SignUpFields).outgoingCCName && (errors as SignUpFields).outgoingCCName}
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
                                    helperText={(touched as SignUpFields).outgoingCCNumber && (errors as SignUpFields).outgoingCCNumber}
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
                                    helperText={(touched as SignUpFields).outgoingCCCVV && (errors as SignUpFields).outgoingCCCVV}
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
                                            autoComplete="outgoing CC ExpiryMonth"
                                            type="outgoingCCExpiryMonth"
                                            label="Expiry Month"
                                            size={"small"}
                                            required
                                            error={Boolean((touched as SignUpFields).outgoingCCExpiryMonth && (errors as SignUpFields).outgoingCCExpiryMonth)}
                                            helperText={(touched as SignUpFields).outgoingCCExpiryMonth && (errors as SignUpFields).outgoingCCExpiryMonth}
                                            {...getFieldProps("outgoingCCExpiryMonth")}
                                        />
                                    </Box>
                                    <Box>
                                        <ThemedTextField
                                            autoComplete="outgoing CC Expiry Year"
                                            type="outgoingCCExpiryYear"
                                            label="Expiry Year"
                                            size={"small"}
                                            required
                                            error={Boolean((touched as SignUpFields).outgoingCCExpiryYear && (errors as SignUpFields).outgoingCCExpiryYear)}
                                            helperText={(touched as SignUpFields).outgoingCCExpiryYear && (errors as SignUpFields).outgoingCCExpiryYear}
                                            {...getFieldProps("outgoingCCExpiryYear")}
                                        />
                                    </Box>

                                </Box>
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
                                    disabled={!stepsComplete() || submitting}
                                    onClick={() => {
                                        if((values as SignUpFields).userType === UserType.CLIENT) {
                                            const enteredFields = values as SignUpFields;
                                            if(enteredFields && handleSubmit) {
                                                //If we were on the last stage (for a client) - disable the button while it is submitting
                                                setSubmitting(true);
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
    );
}

export default PaymentDetails;