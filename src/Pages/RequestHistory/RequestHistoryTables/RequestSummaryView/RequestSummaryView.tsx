import React from 'react';
import {Grid, Typography} from "@mui/material";
import {format} from "date-fns";
import {ServiceRequest} from "../../../../Types/ServiceRequest";


export interface RequestSummaryViewProps {
    /**
     * The request to view
     */
    request: ServiceRequest;
}
export const RequestSummaryView = ({request}: RequestSummaryViewProps) => {
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
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Cost:</Typography>
                </Grid>
                <Grid item>
                    {/*<Typography>{request.cost ? `$${request.cost}` : '-'}</Typography>*/}
                </Grid>
            </Grid>
            <Grid container spacing={2} marginBottom={2}>
                <Grid item>
                    <Typography fontWeight={'bold'}>Additional Description:</Typography>
                </Grid>
                <Grid item>
                    {<Typography>{request.description ? `${request.description}` : '-'}</Typography>}
                </Grid>
            </Grid>
        </>
    )
}