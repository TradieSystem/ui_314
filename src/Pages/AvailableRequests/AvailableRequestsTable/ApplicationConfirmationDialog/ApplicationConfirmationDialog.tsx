import React, {useState} from 'react';
import {ServiceRequest} from "../../../../Types/ServiceRequest";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {format} from "date-fns";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";


export interface ApplicationConfirmationDialogProps {
    /**
     * The {@link ServiceRequest} that is being applied for
     */
    request: ServiceRequest;

    /**
     * Callback to set the open/close status of the {@link ApplicationConfirmationDialog}
     */
    setShowConfirmationDialog: (isOpen: boolean) => void;

    /**
     * Boolean flgag to indicate whether the {@link ApplicationConfirmationDialog} should be visible
     */
    showConfirmationDialog: boolean;
}

export const ApplicationConfirmationDialog = ({
                                                  request,
                                                  setShowConfirmationDialog,
                                                  showConfirmationDialog
                                              }: ApplicationConfirmationDialogProps) => {
    const [requestCharge, setRequestCharge] = useState<string>('');
    console.log()
    return (
        <Dialog open={showConfirmationDialog}>
            <div style={{backgroundColor: "#D8CECD", padding: "12px"}}>
                <DialogTitle id={"application-confirmation__dialog"} sx={{fontWeight: "light", fontSize: "40px"}}>
                    {"Apply for Request"}
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={4} marginBottom={2}>

                        <Grid item>
                            <Typography fontWeight={'bold'}>Application Number:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{`${request.requestID}`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={7} marginBottom={2}>
                        <Grid item>
                            <Typography fontWeight={'bold'}>Application Date:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{`${format(request.requestDate, 'dd/MM/yyyy')}`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={11} marginBottom={2}>
                        <Grid item>
                            <Typography fontWeight={'bold'}>Service Type:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography>{`${request.serviceType}`}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={19} marginBottom={2}>
                        <Grid item>
                            <Typography fontWeight={'bold'}>Cost:</Typography>
                        </Grid>
                        <Grid item>
                            <ThemedTextField
                                required
                                size={"small"}
                                value={requestCharge}
                                error={(requestCharge !== '') && (isNaN(Number(requestCharge)))}
                                helperText={(requestCharge !== '') && isNaN(Number(requestCharge)) && 'Cost should be a numeric value'}
                                onChange={(event) => setRequestCharge(event.target.value)}
                            />
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
                </DialogContent>
                <DialogActions sx={{gap: 2}}>
                    <ThemedButton
                        onClick={() => {
                            setShowConfirmationDialog(false);

                        }}
                        variant={'text'}
                    >
                        Cancel
                    </ThemedButton>
                    {/*TODO add onClick functionality to submit an application to the service request*/}
                    <ThemedButton
                        onClick={() => setShowConfirmationDialog(false)}
                        autoFocus
                        disabled={(isNaN(Number(requestCharge)) || (requestCharge === ''))}
                    >
                        Confirm
                    </ThemedButton>
                </DialogActions>
            </div>
        </Dialog>
    )
}