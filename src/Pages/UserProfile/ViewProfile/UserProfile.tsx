import React from "react";
import {useNavigate} from 'react-router-dom';
import {Box, Grid, Stack, Typography} from "@mui/material";
import {ThemedButton} from "../../../Components/Button/ThemedButton";
import {RoutesEnum} from "../../../Routes";
import {AccountCircleSharp, ManageAccounts} from "@mui/icons-material";
import {User} from "../../../Types/User";
import {motion} from "framer-motion";
import {fadeInUp} from "../../../Effects/Animations";


const UserProfile = () : JSX.Element => {
    const navigate = useNavigate();
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;

    if (user) {
        return (
            <Box
                component={motion.div}
                {...fadeInUp}
            >
                <Stack
                    sx={{
                        display: "grid"
                    }}
                >
                    <div style={{justifyContent: "center", display: "flex"}}>
                        <AccountCircleSharp style={{width: "150px", height: "150px"}}/>
                    </div>
                    <div>
                        <p style={{textAlign: "center", fontSize: "40px",color:"black",fontFamily:'Fahrenheit', fontWeight: 'bold' }}> {user.firstName} {user.lastName}</p>
                        <p style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit', fontWeight: 'bold'}}> {user.userType}</p>
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
                                background: "#f6e3d7",
                                borderRadius: 5,
                                border: "2px solid #DB5B13",
                                padding: 3
                            }}
                        >
                            <Grid container sx={{marginBottom: 2}}>
                                <Grid item>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit', fontWeight: 'bold'}}>Contact Details:</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{gap: 2, marginBottom: 1}}>
                                <Grid item>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit',fontWeight: 'bold'}}>Mobile:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit'}}>{user.mobile}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{gap: 2, marginBottom: 1}}>
                                <Grid item>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit', fontWeight: 'bold'}}>Email:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit'}}>{user.email}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container sx={{gap: 2, marginBottom: 1}}>
                                <Grid item>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit', fontWeight: 'bold'}}>Address:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit'}}>
                                        {`${user.address.streetNumber} ${user.address.streetName}`}
                                    </Typography>
                                    <Typography style={{textAlign: "center", fontSize: "20px",color:"black",fontFamily:'Fahrenheit'}}>
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
    } else {
        return <></>
    }
}
export default UserProfile;