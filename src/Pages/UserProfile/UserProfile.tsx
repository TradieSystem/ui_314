import React from "react";
import {useNavigate} from 'react-router-dom';
import {useAuthContext} from "../../Contexts/AuthContext";
import PageContainer from "../../Components/PageContainer/PageContainer";
import {Box} from "@mui/material";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import {RoutesEnum} from "../../Routes";

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
                        gap: 3,
                    }}>
                    <div style={{textAlign: "center"}}>
                        <h1>User Page</h1>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <p style={{fontSize: "20px"}}>First Name: {user.firstname}</p>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <p style={{fontSize: "20px"}}>Last Name: {user.lastname} </p>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <p style={{fontSize: "20px"}}>Mobile: {user.mobile} </p>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <p style={{fontSize: "20px"}}>Street: {user.address.streetNumber && user.address.streetName} </p>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <p style={{fontSize: "20px"}}>Suburb: {user.address.suburb} </p>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <p style={{fontSize: "20px"}}>postcode: {user.address.postcode} </p>
                    </div>
                    <div style={{textAlign: "center"}}>
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
                            Edit Profile
                        </ThemedButton>
                    </Box>
                </Box>
            </PageContainer>
        );
    }
}
export default UserProfile;