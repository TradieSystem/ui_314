import React, {useEffect, useState} from 'react';
import {Alert, Box, Typography} from "@mui/material";
import {ServiceRequest, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import styles from './RequestSummary.module.css';
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import {RequestSummaryView} from "../RequestSummaryView/RequestSummaryView";
import {RequestSummaryEdit} from "./RequestSummaryEdit/RequestSummaryEdit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {RequestSummaryApplicantsCarousel, ServiceRequestApplicationCard} from "./RequestSummaryApplicantsCarousel";
import {UserType} from "../../../../Types/Account";
import {User} from "../../../../Types/User";
import {ServiceType} from "../../../../Types/ServiceType";
import axios from "axios";
import {CORS_HEADER, DEV_PATH, RoutesEnum} from "../../../../Routes";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {InfoOutlined} from "@mui/icons-material";

export interface RequestSummaryProps {
    /**
     * Callback to handle closing the overlay
     */
    setShowRequestSummary: (showRequestSummary: boolean) => void;

    /**
     * The service request to view details for
     */
    request: ServiceRequest;
}

export const RequestSummary = ({setShowRequestSummary, request}: RequestSummaryProps) => {
    const [showEdit, setShowEdit] = useState(false);

    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const auth_token: string = JSON.parse(localStorage.getItem("auth_token") || "{}");
    const userType = user?.userType;

    const [serviceTypeEdit, setServiceTypeEdit] = useState<ServiceType>();
    const [serviceDescEdit, setServiceDescEdit] = useState<string>();

    const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
    const [loadingCards, setLoadingCards] = useState<boolean>(true);

    const [alert, setAlert] = useState<JSX.Element>(<></>);

    const [cards] = useState<ServiceRequestApplicationCard[]>([]);

    const navigate = useNavigate();

    const handleEdit = () => {
        setLoadingEdit(true);

        const requestEditObject: Partial<ServiceRequest> = {
            requestID: request.requestID,
            serviceType: serviceTypeEdit as ServiceType,
            jobDescription: serviceDescEdit
        }

        axios.put(`${DEV_PATH}/serviceRequest`, requestEditObject, {
            headers: {
                ...CORS_HEADER,
                'Authorization': auth_token
            },
        })
            .then((r) => {
                if (r.data && r.data.requestID) {
                    swal("Success", "Successfully edited the service request", "success")
                        .then(() => window.location.reload());
                } else {
                    throw Error();
                }
            })
            .catch(() => {
                setLoadingEdit(false);
                swal("Error", "An issue occurred when attempting to edit the service request", "error")
                    .then(() => navigate(`/${RoutesEnum.REQUEST_HISTORY}`));
            });
    }


    useEffect(() => {
        request.applications?.forEach((application) => {
            axios.get(`${DEV_PATH}/user/userGet?user_id=${application.professionalID}`, {
                headers: {
                    ...CORS_HEADER,
                    'Authorization': auth_token
                },
            })
                .then((r) => {
                    if (r.data && r.data.firstName && r.data.lastName) {
                        const name = `${r.data.firstName} ${r.data.lastName}`;
                        const newCard: ServiceRequestApplicationCard = {
                            requestID: application.requestID,
                            applicationID: application.applicationID,
                            offerDate: format(new Date(), "MM/dd/yyyy"),
                            professionalID: application.professionalID,
                            cost: application.cost,
                            applicationStatus: application.applicationStatus,
                            professionalName: name
                        }
                        cards.push(newCard);
                    }

                    if (request.applications?.length === cards.length) {       //we reached the end of the initial data that we were iterating through to build up the client name
                        setLoadingCards(false);
                    }
                })
                .catch((error) => {
                    setLoadingCards(false);
                    setAlert(
                        <Alert severity={"error"} onClose={() => setAlert(<></>)} sx={{marginBottom: 2}}>
                            There was an issue retrieving the content
                        </Alert>
                    );
                });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        /*
                Iteration 3 - showing the tradies that are:
                    1. assigned to the job OR
                    2. have applied for the job (in a carousel)
                Iteration 4 -
                  1. showing the payment related info in completed jobs
                    2. showing the review/rating related info/abilities
         */

        <Box
            sx={{
                minWidth: "20%",
                backgroundColor: "#D8CECD",
                borderRadius: "12px"
            }}
        >
            <div className={styles['title']}>
                <Typography variant={'h3'}>
                    {request.requestStatus === ServiceRequestStatus.NEW && `New Service Request`}
                    {/*{request.requestStatus === ServiceRequestStatus.PENDING_ACCEPTANCE && `Request Pending Acceptance`}*/}
                    {request.requestStatus === ServiceRequestStatus.COMPLETE && `Completed Request`}
                    {request.requestStatus === ServiceRequestStatus.PENDING_COMPLETION && `Request Pending Completion`}
                    {request.requestStatus === ServiceRequestStatus.ARCHIVED && `Finalised Request`}
                </Typography>
            </div>
            <div className={styles['request-overview']}>
                {alert}
                <Typography
                    variant={'h4'}
                    sx={{marginBottom: '2rem'}}
                >
                    {!showEdit ? `Request Details` : 'Edit Request Details'}
                </Typography>
                {!showEdit ?
                    <RequestSummaryView request={request}/> :
                    <RequestSummaryEdit
                        request={request}
                        setServiceDescEdit={setServiceDescEdit}
                        setServiceTypeEdit={setServiceTypeEdit}
                    />
                }
            </div>
            {
                !loadingCards ?
                    (
                        (request.applications && request.applications?.length > 0) &&
                        <RequestSummaryApplicantsCarousel
                            cards={cards}
                            request={request}
                            setShowRequestSummary={setShowRequestSummary}
                        />
                    ) :
                    ((request.requestStatus === ServiceRequestStatus.NEW && request.applications !== null) ?
                            <Alert
                                severity={"info"}
                                variant={"outlined"}
                                icon={<InfoOutlined sx={{color: "#3f3f3f"}}></InfoOutlined>}
                                sx={{
                                    color: "#3f3f3f",
                                    backgroundColor: "#c7c7c7",
                                    border: "1.5px solid #3f3f3f",
                                    margin: 2
                                }}
                            >
                                <Typography color={"black"}>
                                    Loading application details...
                                </Typography>
                            </Alert> : <></>
                    )
            }
            <div className={styles['control-buttons']}>
                {!showEdit &&
                    <ThemedButton onClick={() => setShowRequestSummary(false)}>
                        Close
                    </ThemedButton>
                }
                {
                    showEdit &&
                    <ThemedButton onClick={() => setShowEdit(!showEdit)}>
                        Cancel
                    </ThemedButton>
                }
                {
                    ((request.requestStatus === ServiceRequestStatus.NEW) && (userType === UserType.CLIENT)) && (!request.applications || request.applications?.length === 0) &&
                    <ThemedButton
                        onClick={() => {
                            if (showEdit) {
                                handleEdit();
                            } else {
                                setShowEdit(!showEdit);
                            }
                        }}
                        disabled={loadingEdit}
                    >
                        {!showEdit ? `Edit` : `Confirm`}
                    </ThemedButton>
                }
            </div>
        </Box>
    )
}