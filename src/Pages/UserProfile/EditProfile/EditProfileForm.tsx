import React, {useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {Alert, Box, Grid} from "@mui/material";
import {User} from "../../../Types/User";
import {alphabeticRegExp, monthRegExp, numericRegExp, phoneRegExp, postcodeRange} from "../../SignUp/SignUp";
import {EditProfileGeneral} from "./EditProfilePanels/EditProfileGeneral";
import {EditProfileAddress} from "./EditProfilePanels/EditProfileAddress";
import {EditProfileProfessionalDetails} from "./EditProfilePanels/EditProfileProfessionalDetails";
import {EditProfileBillingOut} from "./EditProfilePanels/EditProfileBillingOut";
import {MembershipOption, UserType} from "../../../Types/Account";
import {ServiceType} from "../../../Types/ServiceType";
import {EditProfileButtonControls} from "./EditProfilePanels/EditProfileButtonControls";
import {EditProfileClientAccount} from "./EditProfilePanels/EditProfileClientAccount";
import {CORS_HEADER, DEV_PATH, RoutesEnum} from "../../../Routes";
import axios from "axios";
import swal from "sweetalert";
import {motion} from "framer-motion";
import {fadeInUp} from "../../../Effects/Animations";

export const panelStyling = {
    width: "40%",
    padding: 3,
    borderRadius: "20px",
    border: "1px solid #DB5B13",
    margin: "0 2rem 2rem 2rem",
    background:"#f6e3d7"
}

export interface EditUserFields {
    firstname: string;
    lastname: string;
    password: string;
    streetNumber: string;
    streetName: string;
    suburb: string;
    postcode: string;
    mobile: string;
    userType?: UserType;
    membershipOption?: MembershipOption;
    professionalServices?: ServiceType[];
    incomingCCName: string;
    incomingCCNumber: string;
    incomingCCCVV: string;
    incomingCCExpiryMonth: string,
    incomingCCExpiryYear: string,
    outgoingCCName: string;
    outgoingCCNumber: string;
    outgoingCCCVV: string;
    outgoingCCExpiryMonth: string,
    outgoingCCExpiryYear: string,
    ccPK: string;       //the PK to encrypt CC details
}

const EditSchema = Yup.object().shape({
    mobile: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid'),
    streetName: Yup.string()
        .matches(alphabeticRegExp, "Street name must contain only alphabetic characters"),
    suburb: Yup.string()
        .matches(alphabeticRegExp, "Suburb must contain only alphabetic characters"),
    postcode: Yup.string()
        .matches(postcodeRange, 'Postcode is not valid')
        .length(4, "Postcode should be 4 digits"),
    incomingCCNumber: Yup.string()
        .matches(numericRegExp, 'Card number is not valid')
        .length(16, 'Card length is incorrect'),
    outgoingCCNumber: Yup.string()
        .matches(numericRegExp, 'Card number is not valid')
        .length(16, 'Card length is incorrect'),
    incomingCCExpiryMonth: Yup.string()
        .matches(numericRegExp, 'Expiry month must be numeric value')
        .matches(monthRegExp, 'Not a valid month')
        .length(2, 'Expiry month must be 2 numbers'),
    incomingCCExpiryYear: Yup.string()
        .matches(numericRegExp, 'Expiry year must be numeric value')
        .length(4, 'Expiry year must be 4 numbers'),
    outgoingCCExpiryMonth: Yup.string()
        .matches(numericRegExp, 'Expiry month must be numeric value')
        .matches(monthRegExp, 'Not a valid month')
        .length(2, 'Expiry month must be 2 numbers'),
    outgoingCCExpiryYear: Yup.string()
        .matches(numericRegExp, 'Expiry year must be numeric value')
        .length(4, 'Expiry year must be 4 numbers'),
});

const EditProfileForm = () : JSX.Element => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const authorizationToken = JSON.parse(localStorage.getItem("access_token") || "{}");
    const [generalValid, setGeneralValid] = useState(false);
    const [addressValid, setAddressValid] = useState(false);
    const [billingOutValid, setBillingOutValid] = useState(false);
    const [professionalDetailsValid, setProfessionalDetailsValid] = useState(false);
    const [updatedUserObject, setUpdatedUserObject] = useState<Partial<User>>();

    const [alert, setAlert] = useState<JSX.Element | undefined>();
    const [submitting, setSubmitting] = useState(false);

    const navigate = useNavigate();

    const initialValues: EditUserFields = {
        firstname: "",
        lastname: "",
        password: "",
        streetNumber: "",
        streetName: "",
        suburb: "",
        postcode: "",
        mobile: "",
        membershipOption: undefined,
        professionalServices: undefined,
        incomingCCName: "",
        incomingCCNumber: "",
        incomingCCCVV: "",
        incomingCCExpiryMonth: "",
        incomingCCExpiryYear: "",
        outgoingCCName: "",
        outgoingCCNumber: "",
        outgoingCCCVV: "",
        outgoingCCExpiryMonth: "",
        outgoingCCExpiryYear: "",
        ccPK: ""
    }

    const linkingProfessionalAccountDetailsChanged = (fields: EditUserFields) => {
        return (
            fields.incomingCCExpiryMonth !== "" || fields.incomingCCExpiryYear !== "" || fields.incomingCCCVV !== "" ||
            fields.incomingCCName !== "" || fields.incomingCCNumber !== "" ||
            //@ts-ignore
            (fields.professionalServices !== undefined && fields.professionalServices?.length > 0)
        );
    }

    const fieldInProfessionalAccountDetailsEmpty = (fields: EditUserFields) => {
        return (
            fields.incomingCCCVV === "" || fields.incomingCCNumber === "" || fields.incomingCCName === "" ||
            fields.incomingCCExpiryMonth === "" || fields.incomingCCExpiryYear === "" || fields.professionalServices === undefined ||
            (fields.professionalServices && fields.professionalServices.length === 0)
        );
    }

    const handleSubmit = useCallback((fields: EditUserFields) => {
        let userObject: Partial<User> = {
            user_id: user.user_id,
            firstName: fields.firstname !== "" ? fields.firstname : undefined,
            lastName: fields.lastname !== "" ? fields.lastname : undefined,
            mobile: fields.mobile !== "" ? fields.mobile : undefined,
        }

        //Only add address field as an OBJECT if one of the fields actually changed (we don't want to send address:{})
        if (fields.streetNumber || fields.streetName || fields.suburb || fields.postcode) {
            userObject = {
                ...userObject,
                address: {
                    streetNumber: fields.streetNumber !== "" ? fields.streetNumber : undefined,
                    streetName: fields.streetName !== "" ? fields.streetName : undefined,
                    suburb: fields.suburb !== "" ? fields.suburb : undefined,
                    postcode: fields.postcode !== "" ? fields.postcode : undefined
                }
            }
        } else {
            userObject = {
                ...userObject,
                address: undefined
            }
        }

        let expiry: string | undefined = undefined;

        //Handle adding Outgoing Card details if present
        if (fields.outgoingCCExpiryMonth || fields.outgoingCCExpiryYear || fields.outgoingCCCVV
            || fields.outgoingCCName || fields.outgoingCCNumber) {
            //If only either month OR year are set
            if ((fields.outgoingCCExpiryMonth !== "" && fields.outgoingCCExpiryYear === "") ||
                (fields.outgoingCCExpiryMonth === "" && fields.outgoingCCExpiryYear !== "")
            ) {
                setAlert(
                    <Alert
                        onClose={() => setAlert(undefined)}
                        sx={{
                            marginBottom: 5,
                            marginRight: 3
                        }}
                        severity={"error"}
                    >
                        Please enter both month and year for Billing Out Credit Card.
                    </Alert>
                );
            } else {
                const enteredDate = new Date(`${fields.outgoingCCExpiryMonth}/28/${fields.outgoingCCExpiryYear}`);
                const currentDate = new Date();

                if (currentDate > enteredDate) {
                    setAlert(
                        <Alert
                            onClose={() => setAlert(<></>)}
                            severity={"error"}
                            sx={{
                                marginBottom: 5,
                                marginRight: 3
                            }}
                        >
                            Expiry should be a date in the future
                        </Alert>
                    );
                } else {
                    setAlert(undefined);
                    expiry = `${fields.outgoingCCExpiryMonth}/${fields.outgoingCCExpiryYear}`
                }
            }

            userObject = {
                ...userObject,
                CCOut: {
                    CCName: fields.outgoingCCName !== "" ? fields.outgoingCCName : undefined,
                    CCNumber: fields.outgoingCCNumber !== "" ? fields.outgoingCCNumber : undefined,
                    CCV: fields.outgoingCCCVV !== "" ? fields.outgoingCCCVV : undefined,
                    expiryDate: expiry ? expiry : undefined,
                }
            }
        }

        //If this was a CLIENT only account before - we need all the details for professional
        //I.e. if they are a client only -- they will need actual services PLUS the full billing in detail
        if(user.professional === undefined) {
            if (linkingProfessionalAccountDetailsChanged(fields)) {
                if (fieldInProfessionalAccountDetailsEmpty(fields)) {
                    setAlert(
                        <Alert
                            severity={"error"}
                            sx={{
                                marginBottom: 5,
                                marginRight: 3
                            }}
                            onClose={() => setAlert(undefined)}
                        >
                            All Incoming Credit Card details will need to be provided, and services to offer will
                            also need to be selected.
                        </Alert>
                    );
                } else {
                    setAlert(undefined);
                    userObject = {
                        ...userObject,
                        professional: {
                            CCIn: {
                                CCV: fields.incomingCCCVV !== "" ? fields.incomingCCCVV : undefined,
                                CCNumber: fields.incomingCCNumber !== "" ? fields.incomingCCName : undefined,
                                CCName: fields.incomingCCName !== "" ? fields.incomingCCName : undefined,
                                expiryDate: `${fields.incomingCCExpiryMonth}/${fields.incomingCCExpiryYear}`
                            },
                            services: fields.professionalServices || []
                        }
                    }
                }
            }
        } else {
            if (fields.incomingCCExpiryMonth || fields.incomingCCExpiryYear || fields.incomingCCCVV
                || fields.incomingCCName || fields.incomingCCNumber) {
                //If only either month OR year are set
                if ((fields.incomingCCExpiryMonth !== "" && fields.incomingCCExpiryYear === "") ||
                    (fields.incomingCCExpiryMonth === "" && fields.incomingCCExpiryYear !== "")
                ) {
                    setAlert(
                        <Alert
                            onClose={() => setAlert(undefined)}
                            sx={{
                                marginBottom: 5,
                                marginRight: 3
                            }}
                            severity={"error"}
                        >
                            Please enter both month and year for Billing In Credit Card.
                        </Alert>
                    );
                } else {
                    const enteredDate = new Date(`${fields.incomingCCExpiryMonth}/28/${fields.incomingCCExpiryYear}`);
                    const currentDate = new Date();

                    if (currentDate > enteredDate) {
                        setAlert(
                            <Alert
                                severity={"error"}
                                sx={{
                                    marginBottom: 5,
                                    marginRight: 3
                                }}
                            >
                                Expiry should be a date in the future
                            </Alert>
                        );
                    } else {
                        setAlert(undefined);
                        expiry = `${fields.incomingCCExpiryMonth}/${fields.incomingCCExpiryYear}`
                    }
                }

                userObject = {
                    ...userObject,
                    professional: {
                        services: fields.professionalServices ? fields.professionalServices : user.professional.services,
                        CCIn: {
                            CCName: fields.incomingCCName !== "" ? fields.incomingCCName : undefined,
                            CCNumber: fields.incomingCCNumber !== "" ? fields.incomingCCNumber : undefined,
                            CCV: fields.incomingCCCVV !== "" ? fields.incomingCCCVV : undefined,
                            expiryDate: expiry ? expiry : undefined,
                        }
                    }
                }
            }
        }

        if (fields.membershipOption !== undefined) {
            userObject = {
                ...userObject,
                client: {
                    membershipType: fields.membershipOption
                }
            }
        }

        setSubmitting(true);
        setUpdatedUserObject(userObject);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(submitting) {
            axios
                .put(`${DEV_PATH}/user/updateUser`, updatedUserObject, {
                    headers: {
                        'Authorization': authorizationToken,
                        ...CORS_HEADER
                    },
                })
                .then((response) => {
                    if(response.data.firstName) {
                        let returnedUser : User = response.data;
                        returnedUser = {
                            ...returnedUser,
                            userType: user.userType
                        }
                        localStorage.setItem("user", JSON.stringify(returnedUser));

                        setSubmitting(false);
                        swal("Updated", "Your account has been successfully updated", "success")
                            .then(() => navigate(`/${RoutesEnum.USER_MANAGEMENT}`));
                    } else {
                        swal("Error", "There was an error updating your account", "error")
                            .then(() => navigate(`/${RoutesEnum.USER_MANAGEMENT}`));
                    }
                });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatedUserObject]);

    if (user) {
        return (
            <Box
                component={motion.div}
                {...fadeInUp}
            >
                {alert}
                <Formik initialValues={initialValues} validationSchema={EditSchema} onSubmit={handleSubmit}>
                    <Form>
                        <Grid
                            container
                            columns={16}
                            spacing={2}
                            width={"100%"}
                            sx={{
                                display: "flex",
                                justifyContent: "center"
                            }}
                        >
                            <EditProfileGeneral setGeneralValid={setGeneralValid}/>
                            <EditProfileAddress setAddressValid={setAddressValid}/>
                            <EditProfileBillingOut setBillingOutValid={setBillingOutValid}/>
                            <EditProfileClientAccount/>
                            <EditProfileProfessionalDetails setProfessionalDetailsValid={setProfessionalDetailsValid}/>
                        </Grid>
                        <EditProfileButtonControls handleSubmit={handleSubmit} submitting={submitting} disabled={!generalValid || !addressValid || !billingOutValid || !professionalDetailsValid}/>
                    </Form>
                </Formik>
            </Box>
        );
    } else {
        return <></>
    }
};

export default EditProfileForm;