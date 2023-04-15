import React from 'react';
import {MembershipOption, UserType} from "../../../../Types/Account";
import {Box, FormControlLabel, Grid, Radio, RadioGroup, Typography} from "@mui/material";
import {EditUserFields, panelStyling} from "../EditProfileForm";
import {useFormikContext} from "formik";
import {User} from "../../../../Types/User";

export const EditProfileClientAccount = (): JSX.Element => {
    const {setFieldValue, values} = useFormikContext();
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;

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
                {user.client !== undefined ? `Edit Client Account` : `Link Client Account`}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: 1.5,
                }}
            >
                <Typography
                    align={'center'}
                    variant={'subtitle1'}
                    sx={{fontWeight: 'bold'}}
                >
                    Please select your membership option
                </Typography>
                <RadioGroup
                    aria-labelledby={"user-membership-option__radio-button-group"}
                    onChange={(event) => {
                        setFieldValue("membershipOption", event.currentTarget.value)
                    }}
                    value={(values as EditUserFields).membershipOption ? (values as EditUserFields).membershipOption : " "}
                >
                    <div
                        style={{
                            justifyContent: "center",
                            display: "grid"
                        }}
                    >
                        <FormControlLabel

                            value={MembershipOption.SUBSCRIPTION}
                            control={<Radio color={"warning"} name={"membershipOption"}/>}
                            label={"Subscription"}
                        />
                        <FormControlLabel
                            value={MembershipOption.PAY_AS_YOU_GO}
                            control={<Radio color={"warning"} name={"membershipOption"}/>}
                            label={"Pay as you go"}
                        />
                    </div>

                </RadioGroup>
            </Box>
        </Grid>
    );
}