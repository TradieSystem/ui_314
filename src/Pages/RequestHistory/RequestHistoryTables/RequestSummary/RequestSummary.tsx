import React, {useEffect, useState} from 'react';
import {Alert, Box, FormControlLabel, Radio, RadioGroup, Typography} from "@mui/material";
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
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import Rating from "@mui/material/Rating";

const panelStyling = {
    padding: 3,
    borderRadius: "20px",
    border: "1px solid #DB5B13",
    margin: "0 2rem 2rem 0",
    background:"#f6e3d7"
}

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
    const [markCompleteDisabled, setMarkCompleteDisabled] = useState<boolean>();

    const [loadingEdit, setLoadingEdit] = useState<boolean>(false);
    const [loadingCards, setLoadingCards] = useState<boolean>(true);

    const [alert, setAlert] = useState<JSX.Element>(<></>);

    const [cards] = useState<ServiceRequestApplicationCard[]>([]);
    const [professionalName, setProfessionalName] = useState<string>();

    const [rating, setRating] = useState<number>();
    const [review, setReview] = useState<string>();

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
                        if (request.requestStatus === ServiceRequestStatus.NEW) {
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
                        } else {
                            //We want to send the name to the summary card
                            if (request.professionalID === application.professionalID) {
                                setProfessionalName(name);
                            }
                        }

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
        <Box
            sx={{
                minWidth: "20%",
                backgroundColor: "#f3d9ca",
                borderRadius: "12px"
            }}
        >
            <div className={styles['title']}>
                <Typography variant={'h3'}>
                    {request.requestStatus === ServiceRequestStatus.NEW && `New Service Request`}
                    {request.requestStatus === ServiceRequestStatus.COMPLETE && `Completed Request`}
                    {request.requestStatus === ServiceRequestStatus.PENDING_COMPLETION && `Request Pending Completion`}
                    {request.requestStatus === ServiceRequestStatus.ARCHIVED && `Finalised Request`}
                </Typography>
            </div>
            <div className={styles['request-overview']}>
                {alert}
                <div>
                    <Typography
                        variant={'h4'}
                        sx={{marginBottom: '1rem'}}
                        style={{color:"black",fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                    >
                        {!showEdit ? `Request Details` : 'Edit Request Details'}
                    </Typography>
                    <Box sx={panelStyling}>
                        {!showEdit ?
                            <RequestSummaryView request={request} professionalName={professionalName}/> :
                            <RequestSummaryEdit
                                request={request}
                                setServiceDescEdit={setServiceDescEdit}
                                setServiceTypeEdit={setServiceTypeEdit}
                            />
                        }
                    </Box>
                </div>
                {((request.requestStatus === ServiceRequestStatus.COMPLETE) || (request.requestStatus === ServiceRequestStatus.ARCHIVED)) &&
                    <div>
                        <Typography
                            variant={'h4'}
                            style={{color:"black",fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                            sx={{marginBottom: '1rem'}}
                        >
                            Payment
                        </Typography>
                        <Box sx={panelStyling}>
                            <Typography style={{color:"black",fontSize:"20px",fontFamily:'Fahrenheit'}}>
                                Payment was successfully made with the CC on the account, on request completion.
                            </Typography>
                        </Box>
                        {(userType === UserType.CLIENT) && (request.rating === null && request.review === null) &&
                            <>
                                <Typography
                                    variant={'h4'}
                                    sx={{marginBottom: '1rem'}}
                                >
                                    Leave a rating and review
                                </Typography>
                                <Box sx={panelStyling}>
                                    <Typography style={{color:"black",fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>Rating</Typography>
                                    <RadioGroup>
                                        <RadioGroup
                                            aria-labelledby={"services__form-group"}
                                            onChange={(event) => setRating(event.target.value as unknown as number)}
                                        >
                                            <div style={{justifyContent: "center", display: "flex"}}>
                                                <FormControlLabel
                                                    name={"rating"}
                                                    value={1}
                                                    key={`rating-1`}
                                                    control={<Radio color={"warning"}/>}
                                                    label={1}
                                                />
                                                <FormControlLabel
                                                    name={"rating"}
                                                    value={2}
                                                    key={`rating-2`}
                                                    control={<Radio color={"warning"}/>}
                                                    label={2}
                                                />
                                                <FormControlLabel
                                                    name={"rating"}
                                                    value={3}
                                                    key={`rating-3`}
                                                    control={<Radio color={"warning"}/>}
                                                    label={3}
                                                />
                                                <FormControlLabel
                                                    name={"rating"}
                                                    value={4}
                                                    key={`rating-4`}
                                                    control={<Radio color={"warning"}/>}
                                                    label={4}
                                                />
                                                <FormControlLabel
                                                    name={"rating"}
                                                    value={5}
                                                    key={`rating-5`}
                                                    control={<Radio color={"warning"}/>}
                                                    label={5}
                                                />
                                            </div>

                                        </RadioGroup>
                                    </RadioGroup>
                                    <Typography style={{color:"black",fontSize:"15px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>Review</Typography>
                                    <ThemedTextField
                                        multiline
                                        rows={5}
                                        style={{width: "100%"}}
                                        type={"text"}
                                        label={"Review (Optional)"}
                                        onChange={(event) => setReview(event.target.value)}
                                    />
                                </Box>
                            </>
                        }
                        {(request.rating !== undefined) && (request.rating !== null) &&
                            <>
                                <Typography
                                    variant={'h4'}
                                    style={{color:"black",fontSize:"30px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}
                                    sx={{marginBottom: '1rem'}}
                                >
                                    Review
                                </Typography>
                                <Box sx={panelStyling}>
                                    <Typography style={{color:"black",fontSize:"20px",fontFamily:'Fahrenheit', fontWeight: 'bold' }}>Rating:</Typography>
                                    <Rating name="rating" value={Number(request.rating.toFixed(1))} readOnly/>
                                    {request.review ?
                                        <>
                                            <Typography fontWeight={'bold'}>Review:</Typography>
                                            <Typography>{request.review}</Typography>
                                        </> : <></>
                                    }
                                </Box>
                            </>
                        }

                    </div>
                }
            </div>
            {
                !loadingCards ?
                    (
                        (request.applications && request.applications?.length > 0) &&
                        <RequestSummaryApplicantsCarousel
                            cards={cards}
                            request={request}
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
                {
                    (request.requestStatus === ServiceRequestStatus.PENDING_COMPLETION) && (userType === UserType.PROFESSIONAL) &&
                    <ThemedButton
                        onClick={() => {
                            setMarkCompleteDisabled(true);
                            const InputObject = {
                                requestID: request.requestID,
                                requestStatus: ServiceRequestStatus.COMPLETE

                            }
                            axios.put(`${DEV_PATH}/serviceRequest`, InputObject, {
                                headers: {
                                    'Authorization': auth_token,
                                    ...CORS_HEADER,

                                }
                            }).then(response => {
                                if (response.status === 200) {
                                    swal("Complete!", "You have successfully marked the job as complete!", "success")
                                        .then(() => window.location.reload());
                                } else {
                                    swal("Error", "There was an error marking the job as complete", "error").then(temp => {
                                        setMarkCompleteDisabled(false);
                                    });
                                }
                            })
                        }}
                        disabled={markCompleteDisabled}>
                        Mark Complete
                    </ThemedButton>
                }
                {
                    (request.requestStatus === ServiceRequestStatus.COMPLETE) && (userType === UserType.CLIENT) && (request.rating === null && request.review === null) &&
                    <ThemedButton
                        disabled={rating === undefined}
                        onClick={() => {
                            const requestObject = {
                                reviewID: -1,
                                request_id: request.requestID,
                                rating: rating,
                                review: review
                            }
                            axios.post(`${DEV_PATH}/serviceRequest/review`, requestObject, {
                                headers: {
                                    'Authorization': auth_token,
                                    ...CORS_HEADER,

                                }
                            }).then(response => {
                                if (response.data.reviewID !== undefined) {
                                    swal("Success", "Successfully submitted the review", "success").then(() => window.location.reload());
                                } else {
                                    swal("Error", "Error in submitting the review", "error").then(() => window.location.reload());
                                }
                            });
                        }}
                    >
                        Submit review
                    </ThemedButton>
                }
            </div>
        </Box>
    )
}