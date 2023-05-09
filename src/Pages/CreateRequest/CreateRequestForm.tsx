import React, {useState} from "react";
import Loading from "../../Effects/loading"
import {Box, FormControl, FormControlLabel, Radio, RadioGroup} from "@mui/material";
import {motion} from "framer-motion";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {animate} from '../../Effects/Animations';
import {ServiceType} from "../../Types/ServiceType";
import {ServiceRequestCreate, ServiceRequestStatus} from "../../Types/ServiceRequest";
import {User} from "../../Types/User";
import {format} from "date-fns";
import axios from "axios";
import {CORS_HEADER, DEV_PATH, RoutesEnum} from "../../Routes";
import swal from "sweetalert";
import {useNavigate} from "react-router-dom";

const CreateRequestForm = () => {
    const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.TREE_REMOVAL);
    const [description, setDescription] = useState<string>();
    const [submitting, setSubmitting] = useState(false);

    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const auth_token: string = JSON.parse(localStorage.getItem("access_token") || "{}");

    const navigate = useNavigate();

    const handleSubmit = () => {
        setSubmitting(true);

        const request : ServiceRequestCreate = {
            requestID: -1,
            requestDate: format(new Date(), 'MM/dd/yyyy'),
            serviceType: serviceType,
            requestStatus: ServiceRequestStatus.NEW,
            postcode: user.address.postcode || "",
            clientID: user.user_id,
            jobDescription: description
        }

        axios
            .post(`${DEV_PATH}/serviceRequest`, request, {
                headers: {
                    'Authorization': auth_token,
                    ...CORS_HEADER
                }
            })
            .then((response) => {
                //Check if response was correct
                if(response.data.statusCode === "200") {
                    setSubmitting(false);
                    swal("Created", "The service request was created successfully", "success")
                        .then(() => navigate(`/${RoutesEnum.REQUEST_HISTORY}`));
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                swal("Error", "There was an error creating your request", "error")
                    .then(() => navigate(`/${RoutesEnum.CREATE_REQUEST}`));
            });
    }

    return (
        <Box
            component={motion.div}
            animate={{
                transition: {
                    staggerChildren: 0.55,
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                }}
                component={motion.div}
                initial={{opacity: 0, y: 40}}
                animate={animate}
            >
                <FormControl>
                    <p style={{fontSize: "20px", fontWeight: "bold"}}>Pick a Job:</p>
                    <RadioGroup
                        aria-labelledby="Checkbutton"
                        defaultValue="Tree Removal"
                        name="CheckButton"
                    >
                        <RadioGroup
                            aria-labelledby={"services__form-group"}
                            value={serviceType}
                            onChange={(event) => setServiceType(event.target.value as ServiceType)}
                        >
                            {Object.entries(ServiceType).map(([key, value]) => {
                                return (
                                    <FormControlLabel
                                        name={"professionalServices"}
                                        value={value}
                                        key={key}
                                        control={<Radio color={"warning"}/>}
                                        label={value}
                                    />
                                );
                            })}
                        </RadioGroup>
                    </RadioGroup>
                </FormControl>
                <ThemedTextField
                    multiline
                    rows={15}
                    style={{backgroundColor: "#f6e3d7"}}
                    autoComplete="Description"
                    type="text"
                    label="Description Of Job"
                    onChange={(event) => setDescription(event.target.value)}
                />
                <Box
                    component={motion.div}
                    initial={{opacity: 0, y: 20}}
                    animate={animate}
                    marginTop={3}
                    sx={{
                        display: "flex",
                        justifyContent: "right"
                    }}
                >
                    <ThemedButton
                        type="submit"
                        loadingButton={submitting}
                        onClick={handleSubmit}
                    >
                        {submitting ? <Loading/> : "Send Request Form"}
                    </ThemedButton>
                </Box>
            </Box>
        </Box>
    );
};

export default CreateRequestForm;