import React, {useState} from 'react';
import {
    ServiceRequest,
    ServiceRequestApplication,
    ServiceRequestApplicationStatus,
    ServiceRequestStatus
} from "../../../../Types/ServiceRequest";
import {UserType} from "../../../../Types/Account";
import Slider from "react-slick";
import {Card, CardActions, CardContent, Typography} from "@mui/material";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import './Arrow.css';
import {User} from "../../../../Types/User";
import axios from 'axios';
import {CORS_HEADER, DEV_PATH, RoutesEnum} from '../../../../Routes';
import swal from "sweetalert";
import {useNavigate} from 'react-router-dom';

export interface RequestSummaryApplicantsCarouselProps {
    /**
     * Request to display applicants for
     */
    request: ServiceRequest;

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
                                                     cards
                                                 }: RequestSummaryApplicantsCarouselProps) : JSX.Element => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const auth_token: string = JSON.parse(localStorage.getItem("auth_token") || "{}");
    const userType = user?.userType;

    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);

    const handleSelection = (selectedApplicationId: number) => {
        setLoading(true);
        const requestSelection: Partial<ServiceRequestApplication> = {
            applicationID: selectedApplicationId,
            requestID: request.requestID,
            applicationStatus: ServiceRequestApplicationStatus.APPROVED
        };

        axios.put(`${DEV_PATH}/serviceRequest/application`, requestSelection, {
            headers: {
                ...CORS_HEADER,
                'Authorization': auth_token
            },
        })
            .then((r) => {
                if (r.data.applicationID) {
                    swal("Success", "Successfully selected a professional", "success").then(() => window.location.reload())
                } else {
                    throw Error();
                }
            }).catch(() => {
            swal("Error", "An issue occurred when attempting to accept a professional", "error")
                .then(() => navigate(`/${RoutesEnum.REQUEST_HISTORY}`));
        });

    }

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
                                disabled={loading}
                                onClick={() => handleSelection(card.applicationID)}
                                data-testid={"accept-button"}
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