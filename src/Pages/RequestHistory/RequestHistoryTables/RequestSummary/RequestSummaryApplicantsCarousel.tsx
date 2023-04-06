import React from 'react';
import {ServiceRequest, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import {UserType} from "../../../../Types/Account";
import Slider from "react-slick";
import {useAuthContext} from "../../../../Contexts/AuthContext";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import './Arrow.css';

export interface RequestSummaryApplicantsCarouselProps {
    /**
     * Request to display applicants for
     */
    request: ServiceRequest;

    /**
     * Callback to handle closing the overlay
     */
    setShowRequestSummary: (showRequestSummary: boolean) => void;
}


const lists = [
    {
        professional: 'Freddie Freddie',
        Rating: "5 stars",
        cost: 105.50
    },
    {
        professional: 'some other tradie',
        Rating: "2 stars",
        cost: 101.25
    },
    {
        professional: 'jackson',
        Rating: "3.5 stars",
        cost: 122.12
    },
    {
        professional: 'ahhh',
        Rating: "2.3 stars",
        cost: 10000.30
    }
];


const settings = {
    dots: true,
    styledarrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};

export const RequestSummaryApplicantsCarousel = ({request, setShowRequestSummary}: RequestSummaryApplicantsCarouselProps) => {
    const {user} = useAuthContext();
    const userType = user?.usertype;


    const listItems = lists.map((lists) => <li key={lists.Rating}>
            <div>
                <Card style={{
                    margin: "8px",
                    borderRadius: "20px",
                    border: "2px solid #DB5B13",
                    width: "460px"
                }}>
                    <CardContent style={{
                        height: 200,
                        background: "#d9c8c6",
                        textAlign: "center"
                    }}>
                        <Typography variant="h5" component="h1">
                            Tradie: {lists.professional}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Rating: {lists.Rating}
                        </Typography>
                        <Typography variant="h5" component="h3">
                            Job Number: {`${request.status}`}
                        </Typography>
                        <Typography variant="h5" component="h4">
                            Job Name: {`${request.serviceType}`}
                        </Typography>
                        <Typography variant="h5" component="h5">
                            Job Cost: {`${lists.cost}`}
                        </Typography>
                        <CardActions style={{justifyContent: "center", display: "flex"}}>
                            <ThemedButton
                                type="submit" onClick={() => setShowRequestSummary(false)}
                            > Accept
                            </ThemedButton>

                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        </li>
    );
    return (
        <div>
            {
                ((request.status === ServiceRequestStatus.NEW) && (userType === UserType.CLIENT)) &&
                <>
                    <div style={{width: "1000px", padding: "30px"}}>
                        <Slider{...settings}>{listItems}</Slider>
                    </div>
                </>
            }
        </div>
    );
}