import React from 'react';
import {ServiceRequest, ServiceRequestApplication, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import {UserType} from "../../../../Types/Account";
import Slider from "react-slick";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import './Arrow.css';
import {User} from "../../../../Types/User";

export interface RequestSummaryApplicantsCarouselProps {
    /**
     * Request to display applicants for
     */
    request: ServiceRequest;

    /**
     * Callback to handle closing the overlay
     */
    setShowRequestSummary: (showRequestSummary: boolean) => void;

    /**
     * Cards to display on the carousel
     */
    cards: ServiceRequestApplicationCard[];
}

const settings = {
    dots: true,
    styledarrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1
};

type ServiceRequestApplicationCardBase = Omit<ServiceRequestApplication, "offerDate">;

export interface ServiceRequestApplicationCard extends ServiceRequestApplicationCardBase {
    professionalName: string;
    offerDate: string;
}

export const RequestSummaryApplicantsCarousel = ({
                                                     request,
                                                     setShowRequestSummary,
                                                     cards
                                                 }: RequestSummaryApplicantsCarouselProps) => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const userType = user?.userType;

    const listItems = cards.map((card) =>
        <li key={card.applicationID}>
            <div>
                <Card style={{
                    margin: "8px",
                    borderRadius: "20px",
                    border: "2px solid #DB5B13",
                    width: "460px"
                }}>
                    <CardContent style={{
                        background: "#d9c8c6",
                    }}>
                        <Typography>
                            <b>Professional Name:</b> {card.professionalName}
                        </Typography>
                        <Typography>
                            <b>Application ID:</b> {`${card.applicationID}`}
                        </Typography>
                        <Typography>
                            <b>Job Name:</b> {`${request.serviceType}`}
                        </Typography>
                        <Typography>
                            <b>Job
                                Cost:</b> {request.applications?.filter((application) => application.applicationID === card.applicationID).at(0) ?
                            `$${request.applications?.filter((application) => application.applicationID === card.applicationID).at(0)?.cost}`
                            : '-'
                        }
                        </Typography>
                        <CardActions style={{justifyContent: "center", display: "flex"}}>
                            <ThemedButton
                                type="submit" onClick={() => setShowRequestSummary(false)}
                            >
                                Accept
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
                ((request.requestStatus === ServiceRequestStatus.NEW) && (userType === UserType.CLIENT)) &&
                <>
                    <div style={{width: "1000px", padding: "30px"}}>
                        <Slider{...settings}>{listItems}</Slider>
                    </div>
                </>
            }
        </div>
    );
}