import React, {useState} from 'react';
import {Box, Grid, Typography} from "@mui/material";
import {ServiceRequest, ServiceRequestStatus} from "../../../../../Types/ServiceRequest";
import styles from './RequestSummary.module.css';
import {ThemedButton} from "../../../../../Components/Button/ThemedButton";
import {format} from 'date-fns'
import {RequestSummaryView} from "./RequestSummaryView/RequestSummaryView";
import {RequestSummaryEdit} from "./RequestSummaryEdit/RequestSummaryEdit";

export interface RequestSummaryProps {
    /**
     * Callback to handle closing the overlay
     */
    setShowRequestSummary:(showRequestSummary: boolean) => void;

    /**
     * The service request to view details for
     */
    request: ServiceRequest;
}

export const RequestSummary = ({setShowRequestSummary, request}: RequestSummaryProps) => {
    const [showEdit, setShowEdit] = useState(false);

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
                minWidth: "50%",
                // minHeight: "30%",
                backgroundColor: "#D8CECD",
                borderRadius: "12px"
            }}
        >
            <div className={styles['title']}>
                <Typography variant={'h3'}>
                    {request.status === ServiceRequestStatus.NEW && `New ${request.serviceType} Request`}
                    {request.status === ServiceRequestStatus.PENDING_ACCEPTANCE && `${request.serviceType} Request Pending Acceptance`}
                    {request.status === ServiceRequestStatus.COMPLETE && `Completed ${request.serviceType} Request`}
                    {request.status === ServiceRequestStatus.PENDING_COMPLETION && `${request.serviceType} Request Pending Completion`}
                    {request.status === ServiceRequestStatus.ARCHIVED && `Finalised ${request.serviceType} Request`}
                </Typography>
            </div>
            <div className={styles['request-overview']}>
                <Typography variant={'h4'} sx={{marginBottom: '2rem'}}>{!showEdit ? `Request Details` : 'Edit Request Details'}</Typography>
                {!showEdit ? <RequestSummaryView request={request}/> : <RequestSummaryEdit request={request} />}
            </div>
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
                    (request.status === ServiceRequestStatus.NEW) &&
                    <ThemedButton onClick={() => setShowEdit(!showEdit)}>
                        {!showEdit ? `Edit` : `Confirm`}
                    </ThemedButton>
                }
            </div>
        </Box>
    )
}