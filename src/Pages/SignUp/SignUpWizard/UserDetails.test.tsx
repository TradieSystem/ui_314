import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Formik} from "formik";
import {SignUpFields} from "../SignUp";
import UserDetails from "./UserDetails";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const setCurrentStep = jest.fn();
const handleSubmit = jest.fn();

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

const TestComponent = () => {
    return (
        <MemoryRouter>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                <UserDetails setCurrentStep={setCurrentStep}/>
            </Formik>
        </MemoryRouter>
    )
}

describe('<UserDetails>', () => {
    test('should render the <UserDetails> step with the correct details', () => {
        render(TestComponent());

        expect(screen.getByRole('img', {
            name: /logo/i
        })).toBeInTheDocument();

        expect(screen.getByRole('textbox', {
            name: /first name/i
        })).toBeInTheDocument();

        expect(screen.getByRole('textbox', {
            name: /last name/i
        })).toBeInTheDocument();

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        expect(screen.getByRole('textbox', {
            name: /mobile/i
        })).toBeInTheDocument();
    });

    test('should render an alert if the email is already taken', async () => {
        mockedAxios.get.mockResolvedValue({data: {exists: "True"}})
        render(TestComponent());

        const emailField = screen.getByRole('textbox', {
            name: /email address/i
        });

        await userEvent.type(emailField, "email@gmail.com");

        await waitFor(() => {
            expect(screen.getByTestId('ErrorOutlineIcon')).toBeVisible();
        });

        expect(screen.getByText(/email is already taken\. please choose a different email\./i)).toBeVisible();

        //Should disappear when the email is not taken
        mockedAxios.get.mockResolvedValue({data: {exists: "False"}})
        await userEvent.type(emailField, "email@gmail.com");

        await waitFor(() => {
            expect(screen.queryByTestId('ErrorOutlineIcon')).not.toBeInTheDocument();
        });

        expect(screen.queryByText(/email is already taken\. please choose a different email\./i)).not.toBeInTheDocument();
    });
});