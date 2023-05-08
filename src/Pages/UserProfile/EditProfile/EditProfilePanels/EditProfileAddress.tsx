import React, {useEffect} from 'react';
import {Grid, Typography} from "@mui/material";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import {EditUserFields, panelStyling} from "../EditProfileForm";
import {useFormikContext} from "formik";

export interface EditProfileAddressProps {
    setAddressValid: (isValid: boolean) => void
}

export const EditProfileAddress = ({setAddressValid}: EditProfileAddressProps): JSX.Element => {
    const {errors, touched, getFieldProps, values} = useFormikContext();

    useEffect(() => {
        if (
            ((errors as EditUserFields).streetName === undefined || (values as EditUserFields).streetName === "") &&
            ((errors as EditUserFields).streetNumber === undefined || (values as EditUserFields).streetNumber === "") &&
            ((errors as EditUserFields).suburb === undefined || (values as EditUserFields).suburb === "") &&
            ((errors as EditUserFields).postcode === undefined || (values as EditUserFields).postcode === "")
        ) {
            setAddressValid(true);
        } else {
            setAddressValid(false);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                Address
            </Typography>
            <center>
                <div
                    style={{
                        display: "inline-grid",
                        justifyContent: "center",
                        gap: "1rem"
                    }}
                >
                    <ThemedTextField
                        size={"small"}
                        autoComplete="street number"
                        label="Street Number"
                        type="streetNumber"
                        error={Boolean((touched as EditUserFields).streetNumber && (errors as EditUserFields).streetNumber)}
                        helperText={(touched as EditUserFields).streetNumber && (errors as EditUserFields).streetNumber && "Street number is required"}
                        {...getFieldProps("streetNumber")}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="street name"
                        type="streetName"
                        label="Street Name"
                        error={Boolean((touched as EditUserFields).streetName && (errors as EditUserFields).streetName)}
                        helperText={(touched as EditUserFields).streetName && (errors as EditUserFields).streetName}
                        {...getFieldProps("streetName")}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="suburb"
                        type="suburb"
                        label="Suburb"
                        error={Boolean((touched as EditUserFields).suburb && (errors as EditUserFields).suburb)}
                        helperText={(touched as EditUserFields).suburb && (errors as EditUserFields).suburb}
                        {...getFieldProps("suburb")}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="postcode"
                        type="postcode"
                        label="Postcode"
                        error={Boolean((touched as EditUserFields).postcode && (errors as EditUserFields).postcode)}
                        helperText={(touched as EditUserFields).postcode && (errors as EditUserFields).postcode}
                        {...getFieldProps("postcode")}
                    />
                </div>
            </center>
        </Grid>
    )
}