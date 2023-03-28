import React, {useCallback, useState} from 'react';
import {Form, Formik} from "formik";
import UserDetails from "./SignUpWizard/UserDetails";
import * as Yup from "yup";
import {UserType, MembershipOption} from "../../Types/Account";
import UserAddressDetails from "./SignUpWizard/UserAddressDetails";
import AccountDetails from "./SignUpWizard/AccountDetails";
import {PaymentDetails} from "./SignUpWizard/PaymentDetails/PaymentDetails";
import PaymentDetailsTradie from "./SignUpWizard/PaymentDetails/PaymentDetailsTradie";
import {ServiceType} from "../../Types/ServiceType";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const numericRegExp = /^\d+$/;

const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
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
    streetName: Yup.string().required("Street name is required"),
    suburb: Yup.string().required("Suburb is required"),
    postcode: Yup.string()
        .matches(numericRegExp, 'Postcode is not valid')
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
});

export interface SignUpFields {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    streetNumber: string;
    streetName: string;
    suburb: string;
    postcode: string;
    mobile: string;
    userType?: UserType;
    membershipOption?: MembershipOption;
    professionalServices?: ServiceType[];
    incomingCCName?: string;
    incomingCCNumber?: string;
    incomingCCCVV?:string;
    outgoingCCName?: string;
    outgoingCCNumber?: string;
    outgoingCCCVV?:string;
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

    const initialValues: SignUpFields = {
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
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
        outgoingCCName: "",
        outgoingCCNumber: "",
        outgoingCCCVV: ""
    };

    const handleSubmit = useCallback((fields: SignUpFields) => {
        //TODO sanitise the data
        //if it is a client, delete populated services
        console.log(fields);

        //if it is a professional, delete the membershipOption

        //TODO encrypt the CC details

        //TODO construct user object to send to endpoint

        //TODO send details to sign up endpoint

        //TODO retrieve created user object

        //TODO login with credentials

        //TODO store auth token in context

        //TODO Navigate to homepage
    }, [])


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignUpSchema}
            onSubmit={handleSubmit}
        >

            <Form>
                {/*First step - general user details*/}
                {(currentStep === 0) && <UserDetails setCurrentStep={setCurrentStep}/>}
                {/* Second step - address details*/}
                {(currentStep === 1) && <UserAddressDetails setCurrentStep={setCurrentStep}/>}
                {/* Third step - Account details, in a horizontally populated wizard*/}
                {(currentStep === 2) && <AccountDetails setCurrentStep={setCurrentStep} />}
                {/* Fourth step - Taking payment details (outgoing) - for both clients and professionals*/}
                {(currentStep === 3) && <PaymentDetails setCurrentStep={setCurrentStep} handleSubmit={handleSubmit}/>}
                {/* Fifth step - Taking payment details (incoming) - for professionals only*/}
                {(currentStep === 4) && <PaymentDetailsTradie setCurrentStep={setCurrentStep} handleSubmit={handleSubmit}/>}
            </Form>
        </Formik>
    )
};

export default SignUp;