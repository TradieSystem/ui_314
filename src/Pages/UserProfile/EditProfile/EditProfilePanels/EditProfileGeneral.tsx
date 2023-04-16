import React, {useEffect, useState} from 'react';
import {Grid, IconButton, InputAdornment, Typography} from "@mui/material";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import {EditUserFields, panelStyling} from "../EditProfileForm";
import {useFormikContext} from "formik";
import {Icon} from "@iconify/react";

export interface EditProfileGeneralProps {
    setGeneralValid: (isValid: boolean) => void
}

export const EditProfileGeneral = ({setGeneralValid}: EditProfileGeneralProps): JSX.Element => {
    const {errors, touched, getFieldProps, values} = useFormikContext();
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if ((errors as EditUserFields).mobile === undefined || (values as EditUserFields).mobile === "") {
            setGeneralValid(true);
        } else {
            setGeneralValid(false);
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
                General
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
                        autoComplete="first name"
                        type="firstname"
                        label="First Name"
                        size={"small"}
                        error={Boolean((touched as EditUserFields).firstname && (errors as EditUserFields).firstname)}
                        helperText={(touched as EditUserFields).firstname && (errors as EditUserFields).firstname}
                        {...getFieldProps("firstname")}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="last name"
                        type="lastname"
                        label="Last Name"
                        error={Boolean((touched as EditUserFields).lastname && (errors as EditUserFields).lastname)}
                        helperText={(touched as EditUserFields).lastname && (errors as EditUserFields).lastname}
                        {...getFieldProps("lastname")}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="current-password"
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        error={Boolean((touched as EditUserFields).password && (errors as EditUserFields).password)}
                        helperText={(touched as EditUserFields).password && (errors as EditUserFields).password}
                        {...getFieldProps("password")}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword((prev) => !prev)}
                                    >
                                        {showPassword ? (
                                            <Icon icon="eva:eye-fill"/>
                                        ) : (
                                            <Icon icon="eva:eye-off-fill"/>
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <ThemedTextField
                        size={"small"}
                        autoComplete="mobile"
                        type="mobile"
                        label="Mobile"
                        error={Boolean((touched as EditUserFields).mobile && (errors as EditUserFields).mobile)}
                        helperText={(touched as EditUserFields).mobile && (errors as EditUserFields).mobile}
                        {...getFieldProps("mobile")}
                    />
                </div>
            </center>
        </Grid>
    )
}