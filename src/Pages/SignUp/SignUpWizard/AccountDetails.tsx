import React from 'react';
import {Box, Checkbox, Container, FormControlLabel, FormGroup, Radio, RadioGroup, Typography} from "@mui/material";
import {motion} from "framer-motion";
import {ContentStyle, HeadingStyle, RootStyle} from "../../../CommonStyles/SignUp_Login";
import {animate} from "../../../Effects/Animations";
import {SignUpFields, SignUpProps} from "../SignUp";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {Field, useFormikContext} from "formik";
import {AccountType, MembershipOption, ProfessionalServices} from "../../../Types/AccountType";

export const AccountDetails = ({setCurrentStep}: SignUpProps) => {
    const {values, setFieldValue} = useFormikContext();

    function stepsComplete() {
        //Professionals need at least service selected
        if ((values as SignUpFields).userType === AccountType.PROFESSIONAL) {
            const services = (values as SignUpFields).professionalServices;
            if (services !== undefined && services.length > 0) {
                return true;
            }
        } else if (((values as SignUpFields).userType === AccountType.CLIENT) && ((values as SignUpFields).membershipOption !== undefined)) {
            //Clients need their membership option selected
            return true;
        }
        return false;
    }

    return (
        <RootStyle>
            <Container maxWidth="sm">
                <HeadingStyle>
                    <Typography variant={'h3'}>
                        Account Details
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
                        sx={{marginTop: 2, gap: 2}}
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
                            <Typography
                                align={'center'}
                                sx={{ fontWeight: 'bold' }}
                            >
                                Please select your account type
                            </Typography>
                            <RadioGroup
                                aria-labelledby={"user-type__radio-button-group"}
                                onChange={(event) => {
                                    setFieldValue("userType", event.currentTarget.value)
                                }}
                                value={(values as SignUpFields).userType ? (values as SignUpFields).userType : " "}
                            >
                                <FormControlLabel
                                    value={AccountType.CLIENT}
                                    control={
                                        <Radio
                                            color={"warning"}
                                            name={"userType"}
                                        />
                                    }
                                    label="Client"
                                />
                                <FormControlLabel
                                    value={AccountType.PROFESSIONAL}
                                    control={<Radio color={"warning"} name={"userType"}/>}
                                    label="Professional"
                                />
                            </RadioGroup>
                        </Box>
                        {
                            (values as SignUpFields).userType === AccountType.CLIENT &&
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
                                    sx={{ fontWeight: 'bold' }}
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
                                        value={MembershipOption.SUBSCRIPTION}
                                        control={<Radio color={"warning"} name={"membershipOption"}/>}
                                        label={"Subscription"}
                                    />
                                    <FormControlLabel
                                        value={MembershipOption.SINGLE}
                                        control={<Radio color={"warning"} name={"membershipOption"}/>}
                                        label={"Pay as you go"}
                                    />
                                </RadioGroup>
                            </Box>
                        }
                        {
                            (values as SignUpFields).userType === AccountType.PROFESSIONAL &&
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
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Please select services to offer
                                </Typography>
                                <FormGroup aria-labelledby={"services__form-group"}>
                                    {Object.entries(ProfessionalServices).map(([key, value]) => {
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
                                onClick={() => setCurrentStep(1)}
                            >
                                Back
                            </ThemedButton>
                            <ThemedButton
                                disabled={!stepsComplete()}
                                onClick={() => {
                                    if(stepsComplete()) {
                                        //Move to next step
                                        setCurrentStep(3);
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

export default AccountDetails;