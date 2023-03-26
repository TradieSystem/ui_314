import React from "react";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import { useNavigate } from 'react-router-dom';
import {useAuthContext} from "../../Contexts/AuthContext";
import PageContainer from "../../Components/PageContainer/PageContainer";

const UserProfile = () => {
    const navigate = useNavigate();
    const {user} = useAuthContext();
    if (user) {
        return (
            <div className="container rounded bg-white mt-5 mb-5">
                <div className="row">
                    <div className="col-md-3 border-right">
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                height: "100%"
                            }}
                        >
                            <img className="rounded-circle mt-5" width="150px"
                                 src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/>

                        </div>
                        <div className="d-flex flex-column align-items-center text-center p-3 py-5"></div>


                        <div className="col-md-5 border-right">
                            <div className="p-3 py-5">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h4 className="text-right">Profile</h4>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6"><label className="labels">First Name:</label>
                                        <div>{user.firstname}</div></div>
                                    <br/>
                                    <div className="col-md-6"><label className="labels">Surname:</label>
                                        <div>{user.lastname}</div>
                                    </div>
                                    <br/>
                                </div>
                                <div className="row mt-3">
                                    <div className="col-md-12"><label className="labels">Mobile Number:</label>
                                        <div>{user.mobile}</div></div>
                                    <br/>
                                    <div className="col-md-12"><label className="labels">Email:</label></div>
                                    <div>{user.email}</div>
                                    <br/>
                                    <div className="row mt-3">
                                        <div className="col-md-6"><label className="labels">Address:</label>
                                            <div>{user.address.streetNumber}  {user.address.streetName}</div></div>
                                        <br/>

                                        <div className="col-md-6"><label className="labels">State/Region:</label></div>
                                        <div>{user.address.suburb}</div>
                                        <br/>
                                        <div className="col-md-6"><label className="labels">Post-Code:</label></div>
                                        <div>{user.address.postcode}</div>
                                        <br/>
                                        <div className="col-md-6"><label className="labels">MemberShip:</label></div>
                                        <div>{user.usertype}</div>
                                        <br/>
                                    </div>
                                    <div className="mt-5 text-center"><ThemedButton
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        onClick={() => navigate("/Password")}>Edit Profile</ThemedButton></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default UserProfile;