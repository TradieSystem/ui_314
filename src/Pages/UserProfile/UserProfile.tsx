import React from "react";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from "../../Contexts/AuthContext";
import PageContainer from "../../Components/PageContainer/PageContainer";
import {animate , motion } from "framer-motion";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {Box, Button} from "@mui/material";

const UserProfile = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    if (user) {
        return (
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}>

                    <ThemedTextField
                        label="First Name"
                        value={user.firstname}
                        type="text"/>

                    <ThemedTextField
                        label="Last Name"
                        type="text"
                        value={user.lastname}/>
                    <ThemedTextField
                        type="text"
                        value={user.mobile}
                        label="Mobile"/>
                    <ThemedTextField
                        value={user.address.streetNumber && user.address.streetName}
                        type="text"
                        label="Address"/>

                    <ThemedTextField
                        value={user.address.suburb}
                        type="text"
                        label="State/Region"/>
                    <ThemedTextField
                        value={user.address.postcode}
                        type="text"
                        label="Post-Code"/>
                   <ThemedTextField
                       value={user.usertype}
                       type="text"
                       label="Account Type"/>
                <Box
                    marginTop={3}
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >

        <Button
            sx={{
                background: "rgba(219,91,19,0.3)",
                borderColor: "#DB5B13",
                borderWidth: 1,
                color:"black",
                '&:hover': {
                    background: "rgba(219,91,19,0.3)",
                    borderColor: "#DB5B13",
                    borderWidth: 1.5,
                    boxShadow: 0,
                },
            }}
            type="button"
            variant="contained"
            onClick={() => navigate("/HomePage")}
        >
            {"Go Back"}
        </Button>
                <Button
                    sx={{
                        background: "rgba(219,91,19,0.3)",
                        borderColor: "#DB5B13",
                        borderWidth: 1,
                        color:"black",
                        '&:hover': {
                            background: "rgba(219,91,19,0.3)",
                            borderColor: "#DB5B13",
                            borderWidth: 1.5,
                            boxShadow: 0,
                        },
                    }}
                    type="button"
                    variant="contained"
                    onClick={() => navigate("/EditProfile")}
                >
                    {"Edit Profile"}
                </Button>

            </Box>
            </Box>


        );
    }
}
export default UserProfile;