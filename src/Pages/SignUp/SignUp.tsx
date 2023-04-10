import React, {useCallback, useState} from 'react';
import {Form, Formik} from "formik";
import UserDetails from "./SignUpWizard/UserDetails";
import * as Yup from "yup";
import {MembershipOption, SecurityQuestion, UserType} from "../../Types/Account";
import UserAddressDetails from "./SignUpWizard/UserAddressDetails";
import AccountDetails from "./SignUpWizard/AccountDetails";
import {PaymentDetails} from "./SignUpWizard/PaymentDetails/PaymentDetails";
import PaymentDetailsTradie from "./SignUpWizard/PaymentDetails/PaymentDetailsTradie";
import {ServiceType} from "../../Types/ServiceType";
import {SecurityQuestions} from "./SignUpWizard/SecurityQuestions";
import {User} from "../../Types/User";
import {CCBillingType} from "../../Types/Payment";
import {JSEncrypt} from "jsencrypt";
import axios from "axios";
import {DEV_PATH} from "../../Routes";
import {Alert, Typography} from "@mui/material";
import {InfoOutlined} from "@mui/icons-material";
import SignUpConfirmation from "./SignUpConfirmation";

var md5Hash = require("md5-hash")

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const numericRegExp = /^\d+$/;
const alphabeticRegExp = /^[A-Z]+$/i;

const SignUpSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
        .email("Provide a valid email address")
        .required("Email is required"),
    password: Yup.string().required("Password is required"),
    mobile: Yup.string()
        .matches(phoneRegExp, 'Phone number is not valid')
        .required("Phone number is required"),
    streetNumber: Yup.string().required("Street number is required"),
    streetName: Yup.string()
        .matches(alphabeticRegExp, "Street name must contain only alphabetic characters")
        .required("Street name is required"),
    suburb: Yup.string()
        .matches(alphabeticRegExp, "Suburb must contain only alphabetic characters")
        .required("Suburb is required"),
    postcode: Yup.string()
        .matches(numericRegExp, 'Postcode is not valid')
        .length(4, "Postcode should be 4 digits")
        .required("Postcode is required"),
    incomingCCName: Yup.string().required("CC Name is required"),
    outgoingCCName: Yup.string().required("CC Name is required"),
    incomingCCNumber: Yup.string()
        .matches(numericRegExp, 'Card number is not valid')
        .length(16, 'Card length is incorrect')
        .required("Card number is required"),
    outgoingCCNumber: Yup.string()
        .matches(numericRegExp, 'Card number is not valid')
        .length(16, 'Card length is incorrect')
        .required("Card number is required"),
    incomingCCCVV: Yup.string().required("CVV number is required"),
    outgoingCCCVV: Yup.string().required("CVV number is required"),
    incomingCCExpiryMonth: Yup.string()
        .matches(numericRegExp, 'Expiry month must be numeric value')
        .length(2, 'Expiry month must be 2 numbers')
        .required("Expiry month is required"),
    incomingCCExpiryYear: Yup.string()
        .matches(numericRegExp, 'Expiry year must be numeric value')
        .length(4, 'Expiry year must be 4 numbers')
        .required("Expiry year is required"),
    outgoingCCExpiryMonth: Yup.string()
        .matches(numericRegExp, 'Expiry month must be numeric value')
        .length(2, 'Expiry month must be 2 numbers')
        .required("Expiry month is required"),
    outgoingCCExpiryYear: Yup.string()
        .matches(numericRegExp, 'Expiry year must be numeric value')
        .length(4, 'Expiry year must be 4 numbers')
        .required("Expiry year is required"),
    securityAnswer1: Yup.string().required("Answer required"),
    securityAnswer2: Yup.string().required("Answer required"),
    securityAnswer3: Yup.string().required("Answer required"),
});

export interface SignUpFields {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    securityQuestion1?: SecurityQuestion;
    securityAnswer1: string;
    securityQuestion2?: SecurityQuestion;
    securityAnswer2: string;
    securityQuestion3?: SecurityQuestion;
    securityAnswer3: string;
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

/**
 * Interface to describe sign up wizard properties
 */
export interface SignUpProps {
    /**
     * Callback to set the step
     */
    setCurrentStep: (step: number) => void;

    /**
     * (Optional) callback to submit the form (only provided on last step)
     */
    handleSubmit?: (fields: SignUpFields) => void;
}

export const SignUp = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);
    const [alert, setAlert] = useState<JSX.Element>(<></>);
    const [createdUser, setCreatedUser] = useState<User>();

    const initialValues: SignUpFields = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        securityQuestion1: undefined,        //default values for questions
        securityAnswer1: "",
        securityQuestion2: undefined,
        securityAnswer2: "",
        securityQuestion3: undefined,
        securityAnswer3: "",
        streetNumber: "",
        streetName: "",
        suburb: "",
        postcode: "",
        mobile: "",
        userType: undefined,
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
    };

    const handleSubmit = useCallback((fields: SignUpFields) => {
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(fields.ccPK);

        let userObject: User = {
            user_id: -1,
            firstName: fields.firstname,
            lastName: fields.lastname,
            email: fields.email,
            password: md5Hash.default(fields.password),  //this needs to be hashed
            mobile: fields.mobile,
            address: {
                streetNumber: fields.streetNumber,
                streetName: fields.streetName,
                suburb: fields.suburb,
                postcode: fields.postcode
            },
            CCOut: {            //encrypt fields individually (number and ccv)
                CCName: fields.outgoingCCName,
                CCNumber: fields.outgoingCCNumber,
                //CCNumber: encrypt.encrypt(fields.outgoingCCNumber).toString(),              //currently commented out, as DB doesn't support the length - will come back when there is an update
                expiryDate: `${fields.outgoingCCExpiryMonth}/${fields.outgoingCCExpiryYear}`,
                CCV: fields.outgoingCCCVV,
                //CCV: encrypt.encrypt(fields.outgoingCCCVV).toString(),
                billingType: CCBillingType.OUT
            },
            securityQuestions: {
                securityQuestion1: {
                    securityQuestion: fields.securityQuestion1 || ("" as SecurityQuestion),
                    answer: fields.securityAnswer1
                },
                securityQuestion2: {
                    securityQuestion: fields.securityQuestion2 || ("" as SecurityQuestion),
                    answer: fields.securityAnswer2
                },
                securityQuestion3: {
                    securityQuestion: fields.securityQuestion3 || ("" as SecurityQuestion),
                    answer: fields.securityAnswer3
                }
            }
        }

        if (fields.userType === UserType.PROFESSIONAL) {
            userObject = {
                ...userObject,
                professional: {
                    services: fields.professionalServices || [],
                    CCIn: {
                        CCName: fields.incomingCCName,
                        CCNumber: fields.incomingCCNumber,
                        // CCNumber: encrypt.encrypt(fields.incomingCCNumber).toString(),
                        expiryDate: `${fields.incomingCCExpiryMonth}/${fields.incomingCCExpiryYear}`,
                        CCV: fields.incomingCCCVV,
                        //CCV: encrypt.encrypt(fields.incomingCCCVV).toString(),
                        billingType: CCBillingType.IN
                    }
                }
            }
        }

        if (fields.userType === UserType.CLIENT) {
            userObject = {
                ...userObject,
                client: {
                    membershipType: fields.membershipOption || MembershipOption.PAY_AS_YOU_GO
                }
            }
        }

        setAlert(
            <Alert
                severity={"info"}
                variant={"outlined"}
                icon={<InfoOutlined sx={{color: "#3f3f3f"}}></InfoOutlined>}
                sx={{
                    color: "#3f3f3f",
                    backgroundColor: "#c7c7c7",
                    border: "1.5px solid #3f3f3f",
                }}
            >
                <Typography color={"black"}>
                    Submitting details...
                </Typography>
            </Alert>
        );

        //Send the details to the create user endpoint
        axios
            .post(`${DEV_PATH}/user/userCreate`, userObject, {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    try {
                        //Checking for a field that should definitely be there
                        if (response.data.firstName) {
                            //Set the response user object
                            setCreatedUser(response.data);
                            //Remove any previous errors
                            setAlert(<></>);
                        } else {
                            throw new Error();
                        }
                    } catch (error) {
                        //This error will appear if we receive a 200, with an object that isn't a user
                        setAlert(
                            <Alert severity={"error"} onClose={() => setAlert(<></>)}>
                                There was an issue creating the account with the provided details.
                            </Alert>
                        );
                    }
                } else {
                    throw new Error();
                }
            })
            .catch(() => {
                //This error will appear if we receive a response that is not a 200 status
                setAlert(
                    <Alert severity={"error"}>
                        There was an issue creating the account.
                    </Alert>
                );
            });
    }, []);

    return (
        <>
            {createdUser && <SignUpConfirmation createdUser={createdUser}/>}
            {!createdUser &&
                <Formik
                    initialValues={initialValues}
                    validationSchema={SignUpSchema}
                    onSubmit={handleSubmit}
                >
                    <>
                        {alert}
                        <Form>
                            {/*First step - general user details*/}
                            {(currentStep === 0) && <UserDetails setCurrentStep={setCurrentStep}/>}
                            {/* Second step - address details*/}
                            {(currentStep === 1) && <UserAddressDetails setCurrentStep={setCurrentStep}/>}
                            {/* Third step - Security questions for account recovery */}
                            {(currentStep === 2) && <SecurityQuestions setCurrentStep={setCurrentStep}/>}
                            {/* Fourth step - Account details, in a horizontally populated wizard*/}
                            {(currentStep === 3) && <AccountDetails setCurrentStep={setCurrentStep}/>}
                            {/* Fifth step - Taking payment details (outgoing) - for both clients and professionals*/}
                            {(currentStep === 4) &&
                                <PaymentDetails setCurrentStep={setCurrentStep} handleSubmit={handleSubmit}/>}
                            {/* Sixth step - Taking payment details (incoming) - for professionals only*/}
                            {(currentStep === 5) &&
                                <PaymentDetailsTradie setCurrentStep={setCurrentStep} handleSubmit={handleSubmit}/>}
                        </Form>
                    </>
                </Formik>}
        </>
    );
};

export default SignUp;