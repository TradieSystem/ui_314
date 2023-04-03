import React, {useState} from 'react';
import {Box, styled, Typography} from "@mui/material";
import {ServiceRequest, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import styles from './RequestSummary.module.css';
import  './Arrow.css';
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import {RequestSummaryView} from "../RequestSummaryView/RequestSummaryView";
import {RequestSummaryEdit} from "./RequestSummaryEdit/RequestSummaryEdit";
import {useAuthContext} from "../../../../Contexts/AuthContext";
import {UserType} from "../../../../Types/Account";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// material-ui
import {
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    Button,

} from "@mui/material";
import { makeStyles } from '@mui/styles';
import { useNavigate } from "react-router";


const lists = [
    {
        Professional:"Bob",
        Rating:"5 stars",
        Job_ID: "3",
        Job_Name: "Tree Service",
        Cost:"500"
    },
    {
        Professional:"Dave",
        Rating:"2 stars",
        Job_ID: "3",
        Job_Name: "Tree Service",
        Cost: "1000"
    },
    {
        Professional:"Frank",
        Rating:"3.5 stars",
        Job_ID: "3",
        Job_Name: "Tree Service",
        Cost: "360"
    },
    {
        Professional:"Gavin",
        Rating:"2.3 stars",
        Job_ID: "3",
        Job_Name: "Tree Service",
        Cost: "360"
    }
];

const settings = {
    dots: true,
    arrows:false,
    infinite: false,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1


};

const useStyles = makeStyles({
    root: {
        margin: "8px",
        borderRadius: "20px",
        border: "2px solid #DB5B13",
        width: "460px",
    },
    content: {
        height: 200,
        background: "#d9c8c6",
        textAlign:"center"
    },
});



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

    const {user} = useAuthContext();
    const userType = user?.usertype;
    const classes = useStyles();
    const navigate = useNavigate();


    const listItems = lists.map((lists) => <li key={lists.Professional}>
            <div>
                <Card className={classes.root}>
                    <CardContent className={classes.content}>
                        <Typography variant="h5" component="h1">
                            Tradie: {lists.Professional}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Rating: {lists.Rating}
                        </Typography>
                        <Typography variant="h5" component="h3">
                            Job Number: {lists.Job_ID}
                        </Typography>
                        <Typography variant="h5" component="h4">
                            Job Name: {lists.Job_Name}
                        </Typography>
                        <Typography variant="h5" component="h5">
                            Job Cost: {lists.Cost}
                        </Typography>
                        <CardActions style={{justifyContent: "center", display: "flex"}}>
                            <ThemedButton
                                type="submit" onClick={() => setShowRequestSummary(false)  }
                            > Accept
                            </ThemedButton>

                        </CardActions>
                    </CardContent>
                </Card>
            </div>
        </li>
    );

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
                    {request.status === ServiceRequestStatus.NEW && `New Service Request`}
                    {request.status === ServiceRequestStatus.PENDING_ACCEPTANCE && `${request.serviceType} Request Pending Acceptance`}
                    {request.status === ServiceRequestStatus.COMPLETE && `Completed ${request.serviceType} Request`}
                    {request.status === ServiceRequestStatus.PENDING_COMPLETION && `${request.serviceType} Request Pending Completion`}
                    {request.status === ServiceRequestStatus.ARCHIVED && `Finalised ${request.serviceType} Request`}
                </Typography>
            </div>
            <div className={styles['request-overview'] }>
                <Typography variant={'h4'} sx={{marginBottom: '2rem'}}>{!showEdit ? `Request Details` : 'Edit Request Details'}</Typography>
                {!showEdit ? <RequestSummaryView request={request}/> : <RequestSummaryEdit request={request} />}
            </div>
        <div>
            {
                ((request.status === ServiceRequestStatus.NEW) && (userType === UserType.CLIENT)) &&
                <>
                    <div style={{width:"1000px", padding: "30px"}}>
                        <Slider {...settings}>{listItems}</Slider>
                    </div>
                </>

            }
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
                    ((request.status === ServiceRequestStatus.NEW) && (userType === UserType.CLIENT) && (lists.length === 0)) &&
                    <ThemedButton onClick={() => setShowEdit(!showEdit)}>
                        {!showEdit ? `Edit` : `Confirm`}
                    </ThemedButton>
                }
            </div>
        </Box>
    )
}