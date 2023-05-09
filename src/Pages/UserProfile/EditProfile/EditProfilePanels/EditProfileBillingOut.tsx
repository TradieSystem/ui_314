import React, {useEffect, useState} from 'react';
import {Box, Grid, IconButton, InputAdornment, Typography} from "@mui/material";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import {EditUserFields, panelStyling} from "../EditProfileForm";
import {useFormikContext} from "formik";
import {Icon} from "@iconify/react";

export interface EditProfileBillingOutProps {
    setBillingOutValid: (isValid: boolean) => void
}

export const EditProfileBillingOut = ({setBillingOutValid}: EditProfileBillingOutProps): JSX.Element => {
    const {errors, touched, getFieldProps, values} = useFormikContext();
    const [showCVV, setShowCVV] = useState(false);

    const noMissingField = () => {
        //if one present - both need to be present
        return !(
            ((values as EditUserFields).outgoingCCExpiryMonth !== "" && (values as EditUserFields).outgoingCCExpiryYear === "") ||
            ((values as EditUserFields).outgoingCCExpiryMonth === "" && (values as EditUserFields).outgoingCCExpiryYear !== "")
        );
    }
    const expiryValid = () => {
        //Expiry valid if there were no fields entered
        if(
            (values as EditUserFields).outgoingCCExpiryMonth === "" &&
            (values as EditUserFields).outgoingCCExpiryYear === ""
        ) {
            return true;
        }
        const enteredDate = new Date(`${(values as EditUserFields).outgoingCCExpiryMonth}/28/${(values as EditUserFields).outgoingCCExpiryYear}`);
        const currentDate = new Date();

        return currentDate < enteredDate;
    }

    useEffect(() => {
        if (
            ((errors as EditUserFields).outgoingCCCVV === undefined || (values as EditUserFields).outgoingCCCVV === "") &&
            ((errors as EditUserFields).outgoingCCExpiryMonth === undefined || (values as EditUserFields).outgoingCCExpiryMonth === "") &&
            ((errors as EditUserFields).outgoingCCExpiryYear === undefined || (values as EditUserFields).outgoingCCExpiryYear === "") &&
            ((errors as EditUserFields).outgoingCCName === undefined || (values as EditUserFields).outgoingCCName === "") &&
            ((errors as EditUserFields).outgoingCCNumber === undefined || (values as EditUserFields).outgoingCCNumber === "")
        ) {
            if(noMissingField() && expiryValid()) {
                setBillingOutValid(true);
            } else {
                setBillingOutValid(false);
            }
        } else {
            setBillingOutValid(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [values, errors]);

    return (
        <Grid
            item
            sx={panelStyling}
        >
            <Typography
                style={{textAlign:"center", color:"black", fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold',textDecorationLine: 'underline' }}
                marginBottom={1}
            >
                Billing Out
            </Typography>
            <center>
                <div
                    style={{
                        display: "inline-grid",
                        justifyContent: "center",
                        gap: "1rem"
                    }}
                >
                    {!expiryValid() &&
                        <Typography
                            variant={'subtitle1'}
                            color={"red"}
                        >
                            * Card expiry invalid
                        </Typography>
                    }
                    <ThemedTextField
                        size={"small"}
                        autoComplete="outgoing cc name"
                        label="Name"
                        type="outgoingCCName"
                        error={Boolean((touched as EditUserFields).outgoingCCName && (errors as EditUserFields).outgoingCCName)}
                        helperText={(touched as EditUserFields).outgoingCCName && (errors as EditUserFields).outgoingCCName}
                        {...getFieldProps("outgoingCCName")}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="outgoing cc number"
                        type="outgoingCCNumber"
                        label="Card Number"
                        error={Boolean((touched as EditUserFields).outgoingCCNumber && (errors as EditUserFields).outgoingCCNumber)}
                        helperText={(touched as EditUserFields).outgoingCCNumber && (errors as EditUserFields).outgoingCCNumber}
                        {...getFieldProps("outgoingCCNumber")}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="outgoingCCCVV"
                        type={showCVV ? "text" : "password"}
                        label="CVV"
                        error={Boolean((touched as EditUserFields).outgoingCCCVV && (errors as EditUserFields).outgoingCCCVV)}
                        helperText={(touched as EditUserFields).outgoingCCCVV && (errors as EditUserFields).outgoingCCCVV}
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
                    >
                        <Box>
                            <ThemedTextField
                                autoComplete="outgoing CC ExpiryMonth"
                                type="outgoingCCExpiryMonth"
                                label="Expiry Month"
                                size={"small"}
                                error={Boolean((touched as EditUserFields).outgoingCCExpiryMonth && (errors as EditUserFields).outgoingCCExpiryMonth)}
                                helperText={(touched as EditUserFields).outgoingCCExpiryMonth && (errors as EditUserFields).outgoingCCExpiryMonth}
                                {...getFieldProps("outgoingCCExpiryMonth")}
                            />
                        </Box>
                        <Box>
                            <ThemedTextField
                                autoComplete="outgoing CC Expiry Year"
                                type="outgoingCCExpiryYear"
                                label="Expiry Year"
                                size={"small"}
                                error={Boolean((touched as EditUserFields).outgoingCCExpiryYear && (errors as EditUserFields).outgoingCCExpiryYear)}
                                helperText={(touched as EditUserFields).outgoingCCExpiryYear && (errors as EditUserFields).outgoingCCExpiryYear}
                                {...getFieldProps("outgoingCCExpiryYear")}
                            />
                        </Box>
                    </Box>
                </div>
            </center>
        </Grid>
    )
}