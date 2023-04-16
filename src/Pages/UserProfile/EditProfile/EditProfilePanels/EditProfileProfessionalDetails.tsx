import React, {useEffect, useState} from 'react';
import {Box, Checkbox, FormControlLabel, FormGroup, Grid, IconButton, InputAdornment, Typography} from "@mui/material";
import {EditUserFields, panelStyling} from "../EditProfileForm";
import {Field, useFormikContext} from "formik";
import {User} from "../../../../Types/User";
import {UserType} from "../../../../Types/Account";
import {ServiceType} from "../../../../Types/ServiceType";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import {Icon} from "@iconify/react";

export interface EditProfileProfessionalDetailsProps {
    setProfessionalDetailsValid: (isValid: boolean) => void
}

export const EditProfileProfessionalDetails = ({setProfessionalDetailsValid}: EditProfileProfessionalDetailsProps): JSX.Element => {
    const {errors, touched, getFieldProps, values} = useFormikContext();
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const [showCVV, setShowCVV] = useState(false);

    const professionalServicesEmpty = () => {
        const professionalServices = (values as EditUserFields).professionalServices;
        return professionalServices === undefined || professionalServices?.length === 0;
    }

    const incomingCardDetailsEmptyFieldClient = () => {
        return (
            (values as EditUserFields).incomingCCNumber === "" ||
            (values as EditUserFields).incomingCCName === "" ||
            (values as EditUserFields).incomingCCCVV === "" ||
            (values as EditUserFields).incomingCCExpiryYear === "" ||
            (values as EditUserFields).incomingCCExpiryMonth === ""
        );
    }

    const incomingCardDetailsEmptyFieldProfessional = () => {
        return (
            ((values as EditUserFields).incomingCCExpiryMonth !== "" && (values as EditUserFields).incomingCCExpiryYear === "") ||
            ((values as EditUserFields).incomingCCExpiryMonth === "" && (values as EditUserFields).incomingCCExpiryYear !== "")
        );
    }

    const noChanges = () => {
        return (
            ((values as EditUserFields).incomingCCCVV === "") &&
            ((values as EditUserFields).incomingCCExpiryMonth === "") &&
            ((values as EditUserFields).incomingCCExpiryYear === "") &&
            ((values as EditUserFields).incomingCCName === "") &&
            ((values as EditUserFields).incomingCCNumber === "") &&
            professionalServicesEmpty()
        );
    }

    const noErrors = () => {
        return (
            (errors as EditUserFields).incomingCCCVV === undefined &&
            (errors as EditUserFields).incomingCCExpiryMonth === undefined &&
            (errors as EditUserFields).incomingCCExpiryYear === undefined &&
            (errors as EditUserFields).incomingCCName === undefined &&
            (errors as EditUserFields).incomingCCNumber === undefined
        );
    }

    const cardExpiryValid = () => {
        //Expiry valid if there were no fields entered
        if(
            (values as EditUserFields).incomingCCExpiryMonth === "" &&
            (values as EditUserFields).incomingCCExpiryYear === ""
        ) {
            return true;
        }
        const enteredDate = new Date(`${(values as EditUserFields).incomingCCExpiryMonth}/28/${(values as EditUserFields).incomingCCExpiryYear}`);
        const currentDate = new Date();

        return currentDate < enteredDate;
    }

    useEffect(() => {
        if (noChanges()) {
            setProfessionalDetailsValid(true);
        } else {
            //If they are a CLIENT, they will need both incoming cc details + professional services offered + the fields need to not have errors
            if(user.userType === UserType.CLIENT) {
                if(incomingCardDetailsEmptyFieldClient() || professionalServicesEmpty() || !noErrors() || !cardExpiryValid()) {
                    setProfessionalDetailsValid(false);
                } else {
                    setProfessionalDetailsValid(true);
                }
            } else if(user.userType === UserType.PROFESSIONAL) {
                //If it is a PROFESSIONAL, they will need to just not have errors in the fields
                if(noErrors()) {
                    //Need an expiry month + year combo (if one is present, other must be too
                    if (
                        (values as EditUserFields).incomingCCExpiryYear !== "" ||
                        (values as EditUserFields).incomingCCExpiryMonth !== ""
                    ) {
                        if(cardExpiryValid() && !incomingCardDetailsEmptyFieldProfessional()) {
                            setProfessionalDetailsValid(true);
                        } else {
                            setProfessionalDetailsValid(false);
                        }
                    } else {
                        setProfessionalDetailsValid(true);
                    }
                } else {
                    setProfessionalDetailsValid(false);
                }
            }
        }
    }, [values, errors]);

    return (
        <Grid
            item
            sx={panelStyling}
        >
            <Typography
                sx={{textAlign: "center"}}
                fontWeight={"bold"}
                fontSize={25}
                marginBottom={1}
            >
                {user.userType === UserType.CLIENT ? 'Link Professional Account' : 'Update Professional Details'}
            </Typography>
            <div
                style={{
                    display: "inline-grid",
                    justifyContent: "center",
                    gap: "1rem"
                }}
            >
                <div
                    style={{
                        display: "flex",
                        marginLeft: "1rem",
                        gap: "2rem"
                    }}
                >
                    <div>
                        <Typography
                            variant={'subtitle1'}
                            sx={{fontWeight: 'bold'}}
                        >
                            Please select services to offer
                        </Typography>
                        {
                            user.userType === UserType.CLIENT &&
                            !noChanges() &&
                            <Typography
                                variant={'subtitle1'}
                                color={"red"}
                            >
                                *Required
                            </Typography>
                        }
                        <FormGroup aria-labelledby={"services__form-group"}>
                            {Object.entries(ServiceType).map(([key, value]) => {
                                return (
                                    <Field
                                        type={"checkbox"}
                                        name={"professionalServices"}
                                        value={value}
                                        key={key}
                                        as={FormControlLabel}
                                        control={<Checkbox color={"warning"}/>}
                                        checked={(values as EditUserFields).professionalServices ? (values as EditUserFields).professionalServices?.includes(value) : false}
                                        label={value}
                                    />
                                )
                            })}
                        </FormGroup>
                    </div>
                    <div
                        style={{
                            display: "inline-grid",
                            justifyContent: "center",
                            gap: "1rem"
                        }}
                    >
                        <Typography
                            variant={'subtitle1'}
                            sx={{fontWeight: 'bold'}}
                        >
                            Card details to receive payments
                        </Typography>
                        {
                            user.userType === UserType.CLIENT &&
                            !noChanges() &&
                            <Typography
                                variant={'subtitle1'}
                                color={"red"}
                            >
                                *Required
                            </Typography>
                        }
                        <Box>
                            <ThemedTextField
                                fullWidth
                                size={"small"}
                                autoComplete="incoming cc name"
                                label="Name"
                                type="incomingCCName"
                                error={Boolean((touched as EditUserFields).incomingCCName && (errors as EditUserFields).incomingCCName)}
                                helperText={(touched as EditUserFields).incomingCCName && (errors as EditUserFields).incomingCCName}
                                {...getFieldProps("incomingCCName")}
                            />
                        </Box>
                        <Box>
                            <ThemedTextField
                                fullWidth
                                size={"small"}
                                autoComplete="incoming cc number"
                                type="incomingCCNumber"
                                label="Card Number"
                                error={Boolean((touched as EditUserFields).incomingCCNumber && (errors as EditUserFields).incomingCCNumber)}
                                helperText={(touched as EditUserFields).incomingCCNumber && (errors as EditUserFields).incomingCCNumber}
                                {...getFieldProps("incomingCCNumber")}
                            />
                        </Box>
                        <Box>
                            <ThemedTextField
                                size={"small"}
                                fullWidth
                                autoComplete="incomingCCCVV"
                                type={showCVV ? "text" : "password"}
                                label="CVV"
                                error={Boolean((touched as EditUserFields).incomingCCCVV && (errors as EditUserFields).incomingCCCVV)}
                                helperText={(touched as EditUserFields).incomingCCCVV && (errors as EditUserFields).incomingCCCVV}
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
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                gap: 1,
                            }}
                        >
                            <Box>
                                <ThemedTextField
                                    fullWidth
                                    autoComplete="incoming CC ExpiryMonth"
                                    type="incomingCCExpiryMonth"
                                    label="Expiry Month"
                                    size={"small"}
                                    required
                                    error={Boolean((touched as EditUserFields).incomingCCExpiryMonth && (errors as EditUserFields).incomingCCExpiryMonth)}
                                    helperText={(touched as EditUserFields).incomingCCExpiryMonth && (errors as EditUserFields).incomingCCExpiryMonth}
                                    {...getFieldProps("incomingCCExpiryMonth")}
                                />
                            </Box>
                            <Box>
                                <ThemedTextField
                                    fullWidth
                                    autoComplete="incoming CC Expiry Year"
                                    type="incomingCCExpiryYear"
                                    label="Expiry Year"
                                    size={"small"}
                                    required
                                    error={Boolean((touched as EditUserFields).incomingCCExpiryYear && (errors as EditUserFields).incomingCCExpiryYear)}
                                    helperText={(touched as EditUserFields).incomingCCExpiryYear && (errors as EditUserFields).incomingCCExpiryYear}
                                    {...getFieldProps("incomingCCExpiryYear")}
                                />
                            </Box>
                        </Box>
                    </div>
                </div>
            </div>
        </Grid>
)
}