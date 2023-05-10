import React, {useState} from 'react';
import {ContentStyle, HeadingStyle, RootStyle} from "../../../CommonStyles/SignUp_Login";
import {Alert, Box, Container, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {animate} from "../../../Effects/Animations";
import {SignUpFields, SignUpProps} from "../SignUp";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import ThemedTextField from "../../../Components/TextField/ThemedTextField";
import {useFormikContext} from "formik";
import Logo from '../../../Components/Logo2';
import Image from "./img_2.png";

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
            <Container maxWidth={"sm"}>
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
                                gap: 2,
                            }}
                            component={motion.div}
                            initial={{opacity: 0, y: 40}}
                            animate={animate}
                        >
                            <HeadingStyle>
                                <Logo/>
                            </HeadingStyle>
                            {alert}
                            <HeadingStyle>
                                <Typography variant={'h3'} style={{color:"black", fontSize:"30px",fontFamily:'Fahrenheit'}}>
                                    Address
                                </Typography>
                            </HeadingStyle>
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
        </RootStyle>
    )
}

export default UserAddressDetails;