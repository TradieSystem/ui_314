import React from 'react';
import {ServiceRequest} from "../../../../../Types/ServiceRequest";
import {Box, Grid, MenuItem, TextareaAutosize, Typography} from "@mui/material";
import ThemedSelect from "../../../../../Components/ThemedSelect/ThemedSelect";
import {ServiceType} from "../../../../../Types/ServiceType";
import ThemedTextField from "../../../../../Components/TextField/ThemedTextField";


export interface RequestSummaryEditProps {

    /**
     * The request to edit
     */
    request: ServiceRequest;
}
export const RequestSummaryEdit = ({request}: RequestSummaryEditProps) => {
    return (
        <>
            <Grid container spacing={3} marginBottom={2} gap={3}>
                <Grid item sx={{display: "flex", alignItems: "center"}}>
                    <Typography fontWeight={'bold'}>Service Type:</Typography>
                </Grid>
                <Grid item justifyContent={'right'} display={'flex'}>
                    <ThemedSelect
                        defaultValue={request.serviceType}
                        size={'small'}
                    >
                        {Object.entries(ServiceType).map(([key, value]) => {
                            return (
                                <MenuItem key={key} value={value}>
                                    {value}
                                </MenuItem>
                            )
                        })}
                    </ThemedSelect>
                </Grid>
                <Box width={"100%"} />
                <Grid item sx={{display: "flex", alignItems: "center"}}>
                    <Typography fontWeight={'bold'}>Description:</Typography>
                </Grid>
                <Grid item justifyContent={'right'} display={'flex'}>
                    <ThemedTextField
                        multiline
                    />
                </Grid>
            </Grid>
            <Grid container spacing={3} marginBottom={2}>

            </Grid>
        </>
    )
}