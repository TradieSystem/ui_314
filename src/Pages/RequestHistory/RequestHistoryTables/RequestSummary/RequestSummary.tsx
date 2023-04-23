import React, {useState} from 'react';
import {Alert, Box, Typography} from "@mui/material";
import {ServiceRequest, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import styles from './RequestSummary.module.css';
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import {RequestSummaryView} from "../RequestSummaryView/RequestSummaryView";
import {RequestSummaryEdit} from "./RequestSummaryEdit/RequestSummaryEdit";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {RequestSummaryApplicantsCarousel} from "./RequestSummaryApplicantsCarousel";
import {UserType} from "../../../../Types/Account";
import {User} from "../../../../Types/User";
import {ServiceType} from "../../../../Types/ServiceType";
import axios from "axios";
import {CORS_HEADER, DEV_PATH, RoutesEnum} from "../../../../Routes";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

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

    const [loading, setLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleEdit = () => {
        setLoading(true);

        const requestEditObject : Partial<ServiceRequest> = {
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
                if(r.data && r.data.requestID) {
                    swal("Success", "Successfully edited the service request", "success")
                        .then(() => window.location.reload());
                } else {
                    throw Error();
                }
            })
            .catch(() => {
                setLoading(false);
                swal("Error", "An issue occurred when attempting to edit the service request", "error")
                    .then(() => navigate(`/${RoutesEnum.REQUEST_HISTORY}`));
            });

    }

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
                    {request.requestStatus === ServiceRequestStatus.PENDING_ACCEPTANCE && `Request Pending Acceptance`}
                    {request.requestStatus === ServiceRequestStatus.COMPLETE && `Completed Request`}
                    {request.requestStatus === ServiceRequestStatus.PENDING_COMPLETION && `Request Pending Completion`}
                    {request.requestStatus === ServiceRequestStatus.ARCHIVED && `Finalised Request`}
                </Typography>
            </div>
            <div className={styles['request-overview']}>
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
                request.applications && request.applications?.length > 0 &&
                <RequestSummaryApplicantsCarousel request={request} setShowRequestSummary={setShowRequestSummary}/>
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
                        disabled={loading}
                    >
                        {!showEdit ? `Edit` : `Confirm`}
                    </ThemedButton>
                }
                {
                    (request.requestStatus === ServiceRequestStatus.PENDING_COMPLETION) && (userType == UserType.PROFESSIONAL) &&
                    <ThemedButton
                        onClick={() => {
                            setMarkCompleteDisabled(true);
                            const auth_token = JSON.parse(localStorage.getItem("access_token") || "{ }")
                            const InputObject = {
                                requestID: request.requestID,
                                requestStatus: ServiceRequestStatus.PENDING_COMPLETION

                            }
                            axios.put(`${DEV_PATH}/serviceRequest`, InputObject, {
                                headers: {
                                    'Authorization': auth_token,
                                    ...CORS_HEADER,

                                }
                            }).then(response => {
                                if (response.status === 200) {
                                    swal("Complete!", "You have successfully marked the job as complete!", "success").then(
                                        //Couldn't think of a more elegant way to refresh the page than this, if someone can feel free to change
                                        temp => {
                                            window.location.reload();
                                        });


                                }
                                else {
                                    swal("Error", "Try Again", "error").then(temp => {
                                        setMarkCompleteDisabled(false);
                                    });
                                }
                            })
                        }}
                        disabled={markCompleteDisabled}>
                        Mark Complete
                    </ThemedButton>
                }
            </div>
        </Box>
    )
}