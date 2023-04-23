import React from 'react';
import {Grid, Typography} from "@mui/material";
import {format} from "date-fns";
import {
    ServiceRequest,
    ServiceRequestApplication,
    ServiceRequestApplicationStatus
} from "../../../../Types/ServiceRequest";


export interface RequestSummaryViewProps {
    /**
     * The request to view
     */
    request: ServiceRequest;
    /**
     * (Optional) Professional name to display, if a professional has been assigned
     */
    professionalName?: string;
}

export const RequestSummaryView = ({request, professionalName}: RequestSummaryViewProps) => {
    const approvedApplication: ServiceRequestApplication | undefined = request.applications?.filter((application) => application.applicationStatus === ServiceRequestApplicationStatus.APPROVED).at(0);

    return (
        <>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Application Number:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{`${request.requestID}`}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Application Date:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{`${format(request.requestDate, 'dd/MM/yyyy')}`}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Service Type:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{`${request.serviceType}`}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Status:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{`${request.requestStatus}`}</Typography>
                </Grid>
            </Grid>
            {professionalName &&
                <Grid container spacing={2} marginBottom={2}>
                    <Grid item>
                        <Typography fontWeight={'bold'}>Assigned Professional:</Typography>
                    </Grid>
                    <Grid item>
                        <Typography>{professionalName}</Typography>
                    </Grid>
                </Grid>
            }
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Cost:</Typography>
                </Grid>
                <Grid item>
                    <Typography>{approvedApplication ? `$${approvedApplication.cost}` : '-'}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Additional Description:</Typography>
                </Grid>
                <Grid item>
                    {<Typography>{request.jobDescription ? `${request.jobDescription}` : '-'}</Typography>}
                </Grid>
            </Grid>
        </>
    )
}