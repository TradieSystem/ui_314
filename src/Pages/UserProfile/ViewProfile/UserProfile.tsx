import React from "react";
import {useNavigate} from 'react-router-dom';
import {Box, Grid, Stack, Typography} from "@mui/material";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {RoutesEnum} from "../../../Routes";
import {AccountCircleSharp, ManageAccounts} from "@mui/icons-material";
import {User} from "../../../Types/User";


const UserProfile = () => {
    const navigate = useNavigate();
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;

    if (user) {
        return (
            <Box>
                <Stack
                    sx={{
                        display: "grid"
                    }}
                >
                    <div style={{justifyContent: "center", display: "flex"}}>
                        <AccountCircleSharp style={{width: "150px", height: "150px"}}/>
                    </div>
                    <div>
                        <p style={{textAlign: "center", fontSize: "30px"}}> {user.firstName} {user.lastName}</p>
                        <p style={{textAlign: "center", fontSize: "20px"}}> {user.userType}</p>
                    </div>
                    <Box
                        sx={{
                            direction: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            my: 5
                        }}
                    >
                        <Box
                            sx={{
                                background: "#d9c8c6",
                                borderRadius: 5,
                                border: "2px solid #DB5B13",
                                padding: 4
                            }}
                        >
                            <Grid container sx={{marginBottom: 2}}>
                                <Grid item>
                                    <Typography fontWeight={"bold"} fontSize={20}>Contact Details:</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{gap: 2, marginBottom: 1}}>
                                <Grid item>
                                    <Typography fontWeight={"bold"} fontSize={16}>Mobile:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{user.mobile}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{gap: 2, marginBottom: 1}}>
                                <Grid item>
                                    <Typography fontWeight={"bold"} fontSize={16}>Email:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>{user.email}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{gap: 2, marginBottom: 1}}>
                                <Grid item>
                                    <Typography fontWeight={"bold"} fontSize={16}>Address:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography>
                                        {`${user.address.streetNumber} ${user.address.streetName}`}
                                    </Typography>
                                    <Typography>
                                        {`${user.address.suburb} ${user.address.postcode}`}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Box sx={{
                        direction: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        my: 5
                    }}
                    >
                        <ThemedButton
                            fullWidth
                            size="large"
                            type="button"
                            onClick={() => navigate(`/${RoutesEnum.EDIT_PROFILE}`)}
                        >
                            Edit Profile&nbsp;<ManageAccounts/>
                        </ThemedButton>
                    </Box>
                </Stack>
            </Box>
        );
    }
}
export default UserProfile;