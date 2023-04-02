import React from "react";
import {useNavigate} from 'react-router-dom';
import {useAuthContext} from "../../Contexts/AuthContext";
import PageContainer from "../../Components/PageContainer/PageContainer";
import {Box, Stack} from "@mui/material";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import {RoutesEnum} from "../../Routes";
import  {ManageAccounts} from "@mui/icons-material";
import  {AccountBoxSharp} from "@mui/icons-material";


const UserProfile = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    if (user) {

        return (
            <PageContainer title={''}>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                    }}>

                    <Stack sx={{
                        justifyContent: "center"
                        , display: "grid"
                    }}>
                        <AccountBoxSharp style={{ width:"150px",height:"150px"}}/>
                        <h1 style={{ fontSize: "30px"}}>User Page</h1>
                    </Stack>

                    <div style={{textAlign: "center",
                        background: "rgb(220,220,220)",
                        borderRadius: "20px",
                        border: "2px solid #DB5B13",
                        height: "70px",
                        width: "360px"}}>
                        <p style={{fontSize: "20px"}}>First & Last Name: {user.firstname} {user.lastname}</p>
                    </div>
                    <div style={{textAlign: "center",
                        background: "rgb(220,220,220)",
                        borderRadius: "20px",
                        border: "2px solid #DB5B13",
                        height: "70px",
                        width: "360px"}}>
                        <p style={{fontSize: "20px"}}>Mobile: {user.mobile} </p>
                    </div>
                    <div style={{textAlign: "center",
                        background: "rgb(220,220,220)",
                        borderRadius: "20px",
                        border: "2px solid #DB5B13",
                        height: "70px",
                        width: "360px"}}>
                        <p style={{fontSize: "20px"}}>Street: {user.address.streetNumber && user.address.streetName} </p>
                    </div>
                    <div style={{textAlign: "center",
                        background: "rgb(220,220,220)",
                        borderRadius: "20px",
                        border: "2px solid #DB5B13",
                        height: "70px",
                        width: "360px"}}>
                        <p style={{fontSize: "20px"}}>Suburb: {user.address.suburb} </p>
                    </div>
                    <div style={{textAlign: "center",
                        background: "rgb(220,220,220)",
                        borderRadius: "20px",
                        border: "2px solid #DB5B13",
                        height: "70px",
                        width: "360px"}}>
                        <p style={{fontSize: "20px"}}>postcode: {user.address.postcode} </p>
                    </div>
                    <div style={{textAlign: "center",
                            background: "rgb(220,220,220)",
                            borderRadius: "20px",
                            border: "2px solid #DB5B13",
                            height: "70px",
                            width: "360px"}}>
                        <p style={{fontSize: "20px"}}>User Type: {user.usertype} </p>
                    </div>
                    <Box
                        marginTop={3}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between"
                        }}
                    >
                        <ThemedButton
                            fullWidth
                            size="large"
                            type="button"
                            onClick={() => navigate(`/${RoutesEnum.EDIT_PROFILE}`)}
                        >
                            Edit Profile <ManageAccounts/>
                        </ThemedButton>
                    </Box>
                </Box>
            </PageContainer>
        );
    }
}
export default UserProfile;