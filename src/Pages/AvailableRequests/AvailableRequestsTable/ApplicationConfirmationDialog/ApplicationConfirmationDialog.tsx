import React, {useState} from 'react';
import {
    ServiceRequest,
    ServiceRequestApplication,
    ServiceRequestApplicationStatus
} from "../../../../Types/ServiceRequest";
import {Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography} from "@mui/material";
import {format} from "date-fns";
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import ThemedTextField from "../../../../Components/TextField/ThemedTextField";
import {User} from "../../../../Types/User";
import axios from "axios";
import {CORS_HEADER, DEV_PATH, RoutesEnum} from "../../../../Routes";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";


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

type ServiceRequestApplicationBase = Omit<ServiceRequestApplication, "offerDate">;

interface ServiceRequestApplicationCreate extends ServiceRequestApplicationBase{
    offerDate: string;
}

export const ApplicationConfirmationDialog = ({
                                                  request,
                                                  setShowConfirmationDialog,
                                                  showConfirmationDialog
                                              }: ApplicationConfirmationDialogProps) => {

    const [requestCharge, setRequestCharge] = useState<string>('');

    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const auth_token: string = JSON.parse(localStorage.getItem("auth_token") || "{}");

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        const application : ServiceRequestApplicationCreate = {
            requestID: request.requestID,
            applicationID: -1,              //-1 when we are creating applications
            offerDate: format(new Date(), "MM/dd/yyyy"),
            professionalID: user.user_id,
            cost: Number(requestCharge),
            applicationStatus: ServiceRequestApplicationStatus.PENDING
        }
        axios.post(`${DEV_PATH}/serviceRequest/application`, application, {
            headers: {
                'Authorization': auth_token,
                ...CORS_HEADER
            }
        })
        .then((response) => {
            if(response.data.requestID) {
                swal("Success", "You have successfully applied for the service request.", "success")
                    .then(() => {
                        setLoading(false);
                        setShowConfirmationDialog(false);
                        window.location.reload();
                    })
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            swal("Error", "There was an error submitting an application.", "error")
                .then(() => navigate(`/${RoutesEnum.AVAILABLE_REQUESTS}`));
        });
    }

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
                            {<Typography>{request.jobDescription ? `${request.jobDescription}` : '-'}</Typography>}
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
                    <ThemedButton
                        onClick={() => {
                            handleSubmit();
                        }}
                        autoFocus
                        disabled={(isNaN(Number(requestCharge)) || (requestCharge === '') || loading)}
                    >
                        Confirm
                    </ThemedButton>
                </DialogActions>
            </div>
        </Dialog>
    )
}