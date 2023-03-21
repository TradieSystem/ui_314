import React, {useState} from 'react';
import {ContentStyle, HeadingStyle, RootStyle} from "../../../CommonStyles/SignUp_Login";
import {Alert, Box, Container, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {animate} from "../../../Effects/Animations";
import {SignUpFields, SignUpProps} from "../SignUp";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import ThemedTextField from "../../../Components/TextField/ThemedTextField";
import {useFormikContext} from "formik";

export const UserAddressDetails = ({setCurrentStep}: SignUpProps) => {
    const {errors, touched, getFieldProps} = useFormikContext();
    const [alert, setAlert] = useState(<></>);

    function stepsComplete() {
        return ((errors as SignUpFields).streetNumber === undefined) &&
            ((errors as SignUpFields).streetName === undefined) &&
            ((errors as SignUpFields).suburb === undefined) &&
            ((errors as SignUpFields).postcode === undefined) &&
            ((errors as SignUpFields).postcode) === undefined;
    }

    return (
        <RootStyle>
            <Container maxWidth={"xs"}>
                <HeadingStyle>
                    <Typography variant={'h3'}>
                        Address
                    </Typography>
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
                                autoComplete="street number"
                                label="Street Number"
                                type="streetNumber"
                                required
                                error={Boolean((touched as SignUpFields).streetNumber && (errors as SignUpFields).streetNumber)}
                                helperText={(touched as SignUpFields).streetNumber && (errors as SignUpFields).streetNumber && "Street number is required"}
                                {...getFieldProps("streetNumber")}
                            />
                            <ThemedTextField
                                fullWidth
                                autoComplete="street name"
                                type="streetName"
                                label="Street Name"
                                size={"medium"}
                                required
                                error={Boolean((touched as SignUpFields).streetName && (errors as SignUpFields).streetName)}
                                helperText={(touched as SignUpFields).streetName && (errors as SignUpFields).streetName}
                                {...getFieldProps("streetName")}
                            />
                            <ThemedTextField
                                fullWidth
                                autoComplete="suburb"
                                type="suburb"
                                label="Suburb"
                                size={"medium"}
                                required
                                error={Boolean((touched as SignUpFields).suburb && (errors as SignUpFields).suburb)}
                                helperText={(touched as SignUpFields).suburb && (errors as SignUpFields).suburb}
                                {...getFieldProps("suburb")}
                            />
                            <ThemedTextField
                                fullWidth
                                autoComplete="postcode"
                                type="postcode"
                                label="Postcode"
                                size={"medium"}
                                required
                                error={Boolean((touched as SignUpFields).postcode && (errors as SignUpFields).postcode)}
                                helperText={(touched as SignUpFields).postcode && (errors as SignUpFields).postcode}
                                {...getFieldProps("postcode")}
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
                                onClick={() => setCurrentStep(0)}
                            >
                                Back
                            </ThemedButton>
                            <ThemedButton
                                disabled={!stepsComplete()}
                                onClick={() => {
                                    if(stepsComplete()) {
                                        setCurrentStep(2);
                                    } else {
                                        setAlert(
                                            <Alert severity={"error"}>
                                                Please enter values for all fields
                                            </Alert>
                                        );
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

export default UserAddressDetails;