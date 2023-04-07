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

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const numericRegExp = /^\d+$/;

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
    streetName: Yup.string().required("Street name is required"),
    suburb: Yup.string().required("Suburb is required"),
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
    incomingCCCVV:string;
    incomingCCExpiryMonth: string,
    incomingCCExpiryYear: string,
    outgoingCCName: string;
    outgoingCCNumber: string;
    outgoingCCCVV:string;
    outgoingCCExpiryMonth: string,
    outgoingCCExpiryYear: string,
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
        outgoingCCExpiryYear: ""
    };

    const handleSubmit = useCallback((fields: SignUpFields) => {
        //TODO sanitise the data
        let userObject : User = {
            userId: -1,
            firstName: fields.firstname,
            lastName: fields.lastname,
            email: fields.email,
            password: fields.password,  //this needs to be hashed
            mobile: fields.mobile,
            address: {
                streetNumber: fields.streetNumber,
                streetName: fields.streetName,
                suburb: fields.suburb,
                postcode: fields.postcode
            },
            CCOut: {            //this needs to be encrypted
                CCName: fields.outgoingCCName,
                CCNumber: fields.outgoingCCNumber,
                expiryDate: `${fields.outgoingCCExpiryMonth}/${fields.outgoingCCExpiryYear}`,
                CVV: fields.outgoingCCCVV,
                billingType: CCBillingType.OUT
            },
            securityQuestions: [
                {
                    securityQuestion: fields.securityQuestion1 || ("" as SecurityQuestion),
                    answer: fields.securityAnswer1
                },
                {
                    securityQuestion: fields.securityQuestion2 || ("" as SecurityQuestion),
                    answer: fields.securityAnswer2
                },
                {
                    securityQuestion: fields.securityQuestion3 || ("" as SecurityQuestion),
                    answer: fields.securityAnswer3
                }
            ]
        }

        if(fields.userType === UserType.PROFESSIONAL) {
            userObject = {
                ...userObject,
                professional: {
                    services: fields.professionalServices || [],
                    CCIn: {         //this needs to be encrypted
                        CCName: fields.incomingCCName,
                        CCNumber: fields.incomingCCNumber,
                        expiryDate: `${fields.incomingCCExpiryMonth}/${fields.incomingCCExpiryYear}`,
                        CVV: fields.incomingCCCVV,
                        billingType: CCBillingType.IN
                    }
                }
            }
        }

        if(fields.userType === UserType.CLIENT) {
            userObject = {
                ...userObject,
                client: {
                    membershipType: fields.membershipOption || MembershipOption.PAY_AS_YOU_GO
                }
            }
        }

        console.log(userObject);
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
                {/* Third step - Security questions for account recovery */}
                {(currentStep === 2) && <SecurityQuestions setCurrentStep={setCurrentStep}/>}
                {/* Fourth step - Account details, in a horizontally populated wizard*/}
                {(currentStep === 3) && <AccountDetails setCurrentStep={setCurrentStep} />}
                {/* Fifth step - Taking payment details (outgoing) - for both clients and professionals*/}
                {(currentStep === 4) && <PaymentDetails setCurrentStep={setCurrentStep} handleSubmit={handleSubmit}/>}
                {/* Sixth step - Taking payment details (incoming) - for professionals only*/}
                {(currentStep === 5) && <PaymentDetailsTradie setCurrentStep={setCurrentStep} handleSubmit={handleSubmit}/>}
            </Form>
        </Formik>
    )
};

export default SignUp;