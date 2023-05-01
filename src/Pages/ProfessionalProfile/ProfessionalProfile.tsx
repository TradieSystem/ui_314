import React,{useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import {
    Avatar, Stack, Typography
} from "@mui/material";
import {User} from "../../Types/User";
import {motion} from "framer-motion";
import {fadeInUp} from "../../Effects/Animations";
import CarouselReview from './ReviewCarousel';
import { ServiceRequest } from '../../Types/ServiceRequest';
import { DEV_PATH } from '../../Routes';
import axios from 'axios';



export const ProfessionalProfile = () => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
        const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
        const [averageRating, setAverageRating] = useState<number>(0);

        useEffect(() => {
            axios
                .get(`${DEV_PATH}/serviceRequest`)
                .then((response) => {
                    const data = response.data;
                    if (Array.isArray(data) && data.length > 0) {
                        const firstRequest = data[0];
                        if (firstRequest.id !== undefined) {
                            const filteredRequests = data.filter(
                                (request: ServiceRequest) => request.requestID && request.requestID > 0
                            );
                            setServiceRequests(filteredRequests);
                            const filteredReviews = filteredRequests.filter(
                                (request) => request.rating && request.rating > 0 && request.review && request.review.trim().length > 0
                            );
                            const totalRating = filteredReviews.reduce(
                                (acc, request) => (request.rating ? acc + request.rating : acc),
                                0
                            );
                            const avgRating = filteredReviews.length > 0 ? totalRating / filteredReviews.length : 0;
                            setAverageRating(avgRating);
                        } else {
                            console.error("Invalid data - no service requests found");
                        }
                    } else {
                        console.error("Invalid data - no service requests found");
                    }
                })
                .catch((error) => {
                    console.error("Failed to fetch service requests", error);
                })
        }, []);

    if (user) {
        return (

            <Box
                component={motion.div}
                {...fadeInUp}
            >

                <Stack
                    sx={{
                        justifyContent: "center", display: "flex",alignItems:"center"
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
                        <div style={{justifyContent: "center", display: "flex"}}>
                        <h1>{user.firstName} {user.lastName}</h1>
                        </div>
                        <center><Rating name="read-only" value={Number(averageRating.toFixed(1))} readOnly/></center>
                    </Box>
                <Box sx={{
                    my: 3
                }}>
                    {serviceRequests && serviceRequests.length > 0 ? (
                        <Box style={{height: "800px", width:"800px", justifyContent: "center", display: "flex", alignItems:"center"}}>
                            <CarouselReview filteredReviews={serviceRequests}/>
                        </Box>
                    ) : (
                            <Typography style={{justifyContent: "center", display: "flex",alignItems:"center"}}>There Are No Reviews</Typography>
                    )}
                </Box>
                </Stack>
                </Box>
        );
    }
}

export default ProfessionalProfile;