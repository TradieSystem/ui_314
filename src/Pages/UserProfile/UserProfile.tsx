import React from "react";
import {useNavigate} from 'react-router-dom';
import PageContainer from "../../Components/PageContainer/PageContainer";
import {Box, Stack} from "@mui/material";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import {RoutesEnum} from "../../Routes";
import  {ManageAccounts} from "@mui/icons-material";
import  {AccountCircleSharp} from "@mui/icons-material";
import {User} from "../../Types/User";


const UserProfile = () => {
    const navigate = useNavigate();
    const user : User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    if (user) {

        return (
            <PageContainer title={''}>
                    <Box>
                    <Stack sx={{
                        display: "grid"
                    }}>
                        <h1 style={{textAlign: "center",fontSize: "30px"}}>Profile</h1>
                        <div style={{justifyContent: "center", display: "flex"}}>
                        <AccountCircleSharp style={{width:"150px",height:"150px"}}/>
                            </div>
                        <div>
                        <p style={{textAlign: "center",fontSize: "30px"}}> {user.firstName} {user.lastName}</p>
                            <p style={{textAlign: "center",fontSize: "20px"}}> {user.userType}</p>
                        </div>
                        <Box sx={{ direction:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
                            my: 5
                        }}
                        >

                    <div style={{textAlign: "center",
                        background: "#d9c8c6",
                        borderRadius: "20px",
                        border: "2px solid #DB5B13",
                        height: "300px",
                        width: "460px",
                        padding:"30px"}}>
                        <p style={{fontWeight: "bold",textAlign: "left",fontSize: "20px"}}>Contact Details:</p>
                        <p style={{fontSize: "20px"}}> Mobile: {user.mobile} </p>
                        <p style={{fontSize: "20px"}}> Email: {user.email} </p>

                        <p style={{fontWeight: "bold",textAlign: "left",fontSize: "20px"}}>Address:</p>
                        <p style={{fontSize: "20px"}}> {user.address.streetNumber && user.address.streetName}</p>
                        <p style={{fontSize: "20px"}}> {user.address.suburb} {user.address.postcode}</p>
                        </div>
                        </Box>
                        <Box sx={{ direction:"row",
                            alignItems:"center",
                            justifyContent:"space-between",
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
            </PageContainer>
        );
    }
}
export default UserProfile;