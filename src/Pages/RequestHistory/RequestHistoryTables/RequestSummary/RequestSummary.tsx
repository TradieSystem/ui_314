import React, {useState} from 'react';
import {Box, Typography} from "@mui/material";
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
    const user : User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const userType = user?.userType;

    const handleEdit = () => {
        //TODO send data to endpoint

        //Finally, set the showEdit to false when 'Confirm' is clicked

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
                    <RequestSummaryEdit request={request}/>
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
                    <ThemedButton onClick={() => setShowEdit(!showEdit)}>
                        {!showEdit ? `Edit` : `Confirm`}
                    </ThemedButton>
                }
            </div>
        </Box>
    )
}