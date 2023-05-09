import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {Alert, Avatar, Stack, Typography} from "@mui/material";
import {User} from "../../Types/User";
import {motion} from "framer-motion";
import {fadeInUp} from "../../Effects/Animations";
import ReviewCarousel from './ReviewCarousel';
import {ServiceRequest} from '../../Types/ServiceRequest';
import {CORS_HEADER, DEV_PATH} from '../../Routes';
import axios from 'axios';

export const ProfessionalProfile = (): JSX.Element => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
    const [averageRating, setAverageRating] = useState<number>(0);
    const [alert, setAlert] = useState<JSX.Element>(<></>);
    const auth_token: string = JSON.parse(localStorage.getItem("access_token") || "{}");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`${DEV_PATH}/serviceRequest?userID=${user.user_id}&userType=${user.userType}`, {
                headers: {
                    'Authorization': auth_token,
                    ...CORS_HEADER

                }
            })
            .then((response) => {
                const data = response.data;
                if (Array.isArray(data) && data.length > 0) {
                    const firstRequest: ServiceRequest = data[0];
                    if (firstRequest.requestID !== undefined) {
                        const filteredRequests = data.filter(
                            (request: ServiceRequest) => request.requestID && request.requestID > 0
                        );
                        const filteredReviews = filteredRequests.filter(
                            (request) => request.rating && request.rating > 0
                        );
                        setServiceRequests(filteredReviews);
                        const totalRating = filteredReviews.reduce(
                            (acc, request) => (request.rating ? acc + request.rating : acc),
                            0
                        );
                        const avgRating = filteredReviews.length > 0 ? totalRating / filteredReviews.length : 0;
                        setAverageRating(avgRating);
                        setIsLoading(false);
                    } else {
                        setIsLoading(false);
                    }
                } else {
                    setIsLoading(false);
                }
            }).catch((error) => {
            setIsLoading(false);
            setAlert(
                <Alert severity={"error"} onClose={() => setAlert(<></>)} sx={{marginBottom: 2}}>
                    There was an issue retrieving the content
                </Alert>
            );
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (user) {
        return (
            <Box
                component={motion.div}
                {...fadeInUp}
            >
                {alert}
                <Stack
                    sx={{
                        justifyContent: "center", display: "flex", alignItems: "center"
                    }}
                >
                    <div style={{justifyContent: "center", display: "flex"}}>
                        <Avatar
                            alt="Travis Howard"
                            src="/static/images/avatar/2.jpg"
                            sx={{
                                width: 90,
                                height: 90,
                            }}
                        />
                    </div>
                    <Box style={{justifyContent: "center", display: "grid"}}>
                        <div style={{justifyContent: "center", display: "flex", fontSize: "20px",color:"black",fontFamily:'Fahrenheit', fontWeight: 'bold'}}>
                            <h1>{user.firstName} {user.lastName}</h1>
                        </div>
                        <center><Rating name="read-only" value={Number(averageRating.toFixed(1))} readOnly/></center>
                    </Box>

                    <Box sx={{my: 3}}>
                        {isLoading ? (
                            <Typography style={{
                                justifyContent: "center",
                                display: "flex",
                                alignItems: "center"
                                , fontSize: "20px",
                                color:"black",
                                fontFamily:'Fahrenheit'
                            }}>Loading...</Typography>
                        ) : (
                            <>
                                {serviceRequests && serviceRequests.length > 0 ? (
                                    <Box style={{width: 800}}>
                                        <ReviewCarousel filteredReviews={serviceRequests}/>
                                    </Box>
                                ) : (
                                    <Typography
                                        style={{justifyContent: "center", display: "flex", alignItems: "center",
                                            fontSize: "20px",
                                            color:"black",
                                            fontFamily:'Fahrenheit'}}>There
                                        Are No Reviews</Typography>
                                )}
                            </>
                        )}
                    </Box>
                </Stack>
            </Box>
        );
    } else {
        return <></>;
    }
}

export default ProfessionalProfile;