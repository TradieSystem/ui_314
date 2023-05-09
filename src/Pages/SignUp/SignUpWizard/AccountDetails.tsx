import React from 'react';
import {Box, Checkbox, Container, FormControlLabel, FormGroup, Radio, RadioGroup, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {ContentStyle, HeadingStyle, RootStyle} from "../../../CommonStyles/SignUp_Login";
import {animate} from "../../../Effects/Animations";
import {SignUpFields, SignUpProps} from "../SignUp";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {Field, useFormikContext} from "formik";
import {UserType, MembershipOption} from "../../../Types/Account";
import {ServiceType} from "../../../Types/ServiceType";
import Logo from '../../../Components/logo';
import Image from "./img_2.png";

export const AccountDetails = ({setCurrentStep}: SignUpProps) => {
    const {values, setFieldValue} = useFormikContext();

    function stepsComplete() {
        //Professionals need at least service selected
        if ((values as SignUpFields).userType === UserType.PROFESSIONAL) {
            const services = (values as SignUpFields).professionalServices;
            if (services !== undefined && services.length > 0) {
                return true;
            }
        } else if (((values as SignUpFields).userType === UserType.CLIENT) && ((values as SignUpFields).membershipOption !== undefined)) {
            //Clients need their membership option selected
            return true;
        }
        return false;
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
            <Container maxWidth="sm">
                <HeadingStyle>
                    <HeadingStyle style={{color:"black", fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>
                        T-Titans
                        <Logo/>
                    </HeadingStyle>
                </HeadingStyle>
                <ContentStyle>
                    <Box
                        component={motion.div}
                        animate={{
                            transition: {
                                staggerChildren: 0.55
                            }
                        }}
                        sx={{marginTop: 2, gap: 2}}
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
                            <Typography variant={'h3'}  style={{textAlign:"center",color:"black", fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold',textDecorationLine: 'underline' }}>
                                Account Details
                            </Typography>
                            <Typography
                                align={'center'}
                                style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                            >
                                Please select your account type:
                            </Typography>
                            <RadioGroup
                                aria-labelledby={"user-type__radio-button-group"}
                                onChange={(event) => {
                                    setFieldValue("userType", event.currentTarget.value)
                                }}
                                value={(values as SignUpFields).userType ? (values as SignUpFields).userType : " "}
                            >
                                <FormControlLabel
                                    style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                    value={UserType.CLIENT}
                                    control={
                                        <Radio
                                            color={"warning"}
                                            name={"userType"}
                                        />
                                    }
                                    label="Client"
                                />
                                <FormControlLabel
                                    style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                    value={UserType.PROFESSIONAL}
                                    control={<Radio color={"warning"} name={"userType"}/>}
                                    label="Professional"
                                />
                            </RadioGroup>
                        </Box>
                        {
                            (values as SignUpFields).userType === UserType.CLIENT &&
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
                                <Typography
                                    style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                    align={'center'}
                                    variant={'subtitle1'}
                                >
                                    Please select your membership option
                                </Typography>
                                <RadioGroup
                                    aria-labelledby={"user-membership-option__radio-button-group"}
                                    onChange={(event) => {
                                        setFieldValue("membershipOption", event.currentTarget.value)
                                    }}
                                    value={(values as SignUpFields).membershipOption ? (values as SignUpFields).membershipOption : " "}
                                >
                                    <FormControlLabel
                                        style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                        value={MembershipOption.SUBSCRIPTION}
                                        control={<Radio color={"warning"} name={"membershipOption"}/>}
                                        label={"Subscription"}
                                    />
                                    <FormControlLabel
                                        style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                        value={MembershipOption.PAY_AS_YOU_GO}
                                        control={<Radio color={"warning"} name={"membershipOption"}/>}
                                        label={"Pay as you go"}
                                    />
                                </RadioGroup>
                            </Box>
                        }
                        {
                            (values as SignUpFields).userType === UserType.PROFESSIONAL &&
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
                                <Typography
                                    align={'center'}
                                    variant={'subtitle1'}
                                    style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                >
                                    Please select services to offer:
                                </Typography>
                                <FormGroup aria-labelledby={"services__form-group"} style={{color:"black",fontSize:"18px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>
                                    {Object.entries(ServiceType).map(([key, value]) => {
                                        return (
                                            <Field
                                                type={"checkbox"}
                                                name={"professionalServices"}
                                                value={value}
                                                key={key}
                                                as={FormControlLabel}
                                                control={<Checkbox color={"warning"} />}
                                                checked={(values as SignUpFields).professionalServices ? (values as SignUpFields).professionalServices?.includes(value) : false}
                                                label={value}
                                            />
                                        )
                                    })}
                                </FormGroup>
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
                                onClick={() => setCurrentStep(2)}
                            >
                                Back
                            </ThemedButton>
                            <ThemedButton
                                disabled={!stepsComplete()}
                                onClick={() => {
                                    if(stepsComplete()) {
                                        //Move to next step
                                        setCurrentStep(4);
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

export default AccountDetails;