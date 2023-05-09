import React, {useEffect, useState} from 'react';
import {SignUpFields, SignUpProps} from "../SignUp";
import {useFormikContext} from "formik";
import {ContentStyle, HeadingStyle, RootStyle} from "../../../CommonStyles/SignUp_Login";
import {Alert, Box, Container, MenuItem, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {animate} from "../../../Effects/Animations";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import ThemedSelect from "../../../Components/ThemedSelect/ThemedSelect";
import {SecurityQuestion} from "../../../Types/Account";
import ThemedTextField from "../../../Components/TextField/ThemedTextField";
import Logo from '../../../Components/logo';
import Image from "./img_2.png";

export const SecurityQuestions = ({setCurrentStep}: SignUpProps) => {
    const {errors, touched, getFieldProps, values, setFieldValue} = useFormikContext();
    const [alert, setAlert] = useState(<></>);

    function questionsAreDifferent() {
        return !(((values as SignUpFields).securityQuestion1 === (values as SignUpFields).securityQuestion2 || (values as SignUpFields).securityQuestion2 === (values as SignUpFields).securityQuestion3 || (values as SignUpFields).securityQuestion1 === (values as SignUpFields).securityQuestion3) &&
            ((values as SignUpFields).securityQuestion1 !== undefined && (values as SignUpFields).securityQuestion2 !== undefined && (values as SignUpFields).securityQuestion3 !== undefined));
    }

    function answersAreDifferent() {
        return !(((values as SignUpFields).securityAnswer1 === (values as SignUpFields).securityAnswer2 || (values as SignUpFields).securityAnswer2 === (values as SignUpFields).securityAnswer3 || (values as SignUpFields).securityAnswer1 === (values as SignUpFields).securityAnswer3) &&
            ((values as SignUpFields).securityAnswer1 !== "" && (values as SignUpFields).securityAnswer2 !== "" && (values as SignUpFields).securityAnswer3 !== ""));
    }

    useEffect(() => {
        if(!questionsAreDifferent()) {
            setAlert(
                <Alert severity={"error"}>
                    Please select 3 different questions
                </Alert>
            );
        } else if(!answersAreDifferent()) {
            setAlert(
                <Alert severity={"error"}>
                    Please enter 3 different answers for the selected questions
                </Alert>
            );
        } else {
            setAlert(<></>);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values]);

    function stepsComplete() {
        return (errors as SignUpFields).securityQuestion1 === undefined &&
            (errors as SignUpFields).securityQuestion2 === undefined &&
            (errors as SignUpFields).securityQuestion3 === undefined &&
            (values as SignUpFields).securityAnswer1 !== undefined &&
            (values as SignUpFields).securityAnswer2 !== undefined &&
            (values as SignUpFields).securityAnswer3 !== undefined &&
            (values as SignUpFields).securityAnswer1 !== "" &&
            (values as SignUpFields).securityAnswer2 !== "" &&
            (values as SignUpFields).securityAnswer3 !== "" &&
            questionsAreDifferent() &&
            answersAreDifferent()
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
                borderRadius: "25px"
            }}>
            <Container maxWidth={"xs"}>
                    <HeadingStyle style={{color:"black", fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>
                        T-Titans
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
                        <HeadingStyle>
                            <Typography variant={'h3'} style={{color:"black", fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold',textDecorationLine: 'underline' }}>
                                Security Questions
                            </Typography>
                        </HeadingStyle>
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
                            <Typography style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>Question 1:</Typography>
                            <ThemedSelect
                                size={'small'}
                                value={(values as SignUpFields).securityQuestion1 || ''}
                                label={'Security Question 1'}
                                onChange={(event) => setFieldValue('securityQuestion1', event.target.value as SecurityQuestion)}
                            >
                                {Object.entries(SecurityQuestion).map(([key, value]) => {
                                    return (
                                        ((values as SignUpFields).securityQuestion2 !== key) && ((values as SignUpFields).securityQuestion3 !== key) &&
                                            <MenuItem key={key} value={value}>
                                                {value}
                                            </MenuItem>
                                    );
                                })}
                            </ThemedSelect>
                            <ThemedTextField
                                fullWidth
                                autoComplete={"security answer 1"}
                                type={"securityAnswer1"}
                                size={"small"}
                                required
                                error={Boolean((touched as SignUpFields).securityAnswer1 && (errors as SignUpFields).securityAnswer1)}
                                helperText={(touched as SignUpFields).securityAnswer1 && (errors as SignUpFields).securityAnswer1 && "Answer is required"}
                                {...getFieldProps("securityAnswer1")}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                                marginTop: 2
                            }}
                            component={motion.div}
                            initial={{opacity: 0, y: 40}}
                            animate={animate}
                        >
                            <Typography style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>Question 2:</Typography>
                            <ThemedSelect
                                size={'small'}
                                value={(values as SignUpFields).securityQuestion2 || ''}
                                label={'Security Question 2'}
                                onChange={(event) => setFieldValue('securityQuestion2', event.target.value as SecurityQuestion)}
                            >
                                {Object.entries(SecurityQuestion).map(([key, value]) => {
                                    return (
                                        ((values as SignUpFields).securityQuestion1 !== key) && ((values as SignUpFields).securityQuestion3 !== key) &&
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    );
                                })}
                            </ThemedSelect>
                            <ThemedTextField
                                fullWidth
                                autoComplete={"security answer 2"}
                                type={"securityAnswer2"}
                                size={"small"}
                                required
                                error={Boolean((touched as SignUpFields).securityAnswer2 && (errors as SignUpFields).securityAnswer2)}
                                helperText={(touched as SignUpFields).securityAnswer2 && (errors as SignUpFields).securityAnswer2 && "Answer is required"}
                                {...getFieldProps("securityAnswer2")}
                            />
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 1.5,
                                marginTop: 2
                            }}
                            component={motion.div}
                            initial={{opacity: 0, y: 40}}
                            animate={animate}
                        >
                            <Typography style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>Question 3:</Typography>
                            <ThemedSelect
                                size={'small'}
                                value={(values as SignUpFields).securityQuestion3 || ''}
                                label={'Security Question 3'}
                                onChange={(event) => setFieldValue('securityQuestion3', event.target.value as SecurityQuestion)}
                            >
                                {Object.entries(SecurityQuestion).map(([key, value]) => {
                                    return (
                                        ((values as SignUpFields).securityQuestion1 !== key) && ((values as SignUpFields).securityQuestion2 !== key) &&
                                        <MenuItem key={key} value={value}>
                                            {value}
                                        </MenuItem>
                                    );
                                })}
                            </ThemedSelect>
                            <ThemedTextField
                                fullWidth
                                autoComplete={"security answer 3"}
                                type={"securityAnswer3"}
                                size={"small"}
                                required
                                error={Boolean((touched as SignUpFields).securityAnswer3 && (errors as SignUpFields).securityAnswer3)}
                                helperText={(touched as SignUpFields).securityAnswer3 && (errors as SignUpFields).securityAnswer3 && "Answer is required"}
                                {...getFieldProps("securityAnswer3")}
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
                                onClick={() => setCurrentStep(1)}
                            >
                                Back
                            </ThemedButton>
                            <ThemedButton
                                disabled={!stepsComplete()}
                                onClick={() => {
                                    if (stepsComplete()) {
                                        setCurrentStep(3);
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