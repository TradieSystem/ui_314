import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Formik} from "formik";
import {SignUpFields} from "../../SignUp";
import PaymentDetails from "./PaymentDetails";
import userEvent from "@testing-library/user-event";
import {UserType} from "../../../../Types/Account";

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

const handleSubmit = jest.fn();
const setCurrentStep = jest.fn();

const TestComponent = (userType: UserType) => {
    return (
        <Formik initialValues={{...initialValues, userType: userType}} onSubmit={handleSubmit}>
            {userType === UserType.PROFESSIONAL
                ? <PaymentDetails setCurrentStep={setCurrentStep}/>
                : <PaymentDetails setCurrentStep={setCurrentStep} handleSubmit={handleSubmit}/>
            }
        </Formik>
    )
}

describe('<PaymentDetails>', () => {
    test('should render the <PaymentDetails> slide with the correct structure', async () => {
        render(TestComponent(UserType.PROFESSIONAL));

        //Trigger validations
        await userEvent.click(screen.getByRole('textbox', {
            name: /name/i
        }));
        await userEvent.type(screen.getByRole('textbox', {
            name: /name/i
        }), "test");

        expect(screen.getByRole('heading', {
            name: /outgoing payment details/i
        })).toBeVisible();

        expect(screen.getByRole('textbox', {
            name: /name/i
        })).toBeInTheDocument();

        expect(screen.getByRole('textbox', {
            name: /card number/i
        })).toBeInTheDocument();

        expect(screen.getByText(/expiry month \*/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {
            name: /expiry month/i
        })).toBeInTheDocument();

        expect(screen.getByText(/expiry year \*/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {
            name: /expiry year/i
        })).toBeInTheDocument();

        expect(screen.getByRole('button', {
            name: /next/i
        })).toBeInTheDocument();

        expect(screen.getByRole('button', {
            name: /back/i
        })).toBeInTheDocument();
    });

    test('should validate the credit card expiry date', async () => {
        render(TestComponent(UserType.PROFESSIONAL));

        const month = screen.getByRole('textbox', {
            name: /expiry month/i
        });
        const year = screen.getByRole('textbox', {
            name: /expiry year/i
        });

        await userEvent.type(month, "01");
        await userEvent.type(year, "1999");

        //Expect the warning to appear for expired card
        await waitFor(() => {
            expect(screen.getByTestId('ErrorOutlineIcon')).toBeVisible();
        });

        expect(screen.getByText(/expiry should be a date in the future/i)).toBeVisible();
        expect(screen.getByRole('button', {
            name: /next/i
        })).toBeDisabled();

        //Now to clear the error
        await userEvent.clear(month);
        await userEvent.clear(year);
        await userEvent.type(month, "01");
        await userEvent.type(year, "2030");

        await waitFor(() => {
            expect(screen.queryByTestId('ErrorOutlineIcon')).not.toBeInTheDocument();
        });

        expect(screen.queryByText(/expiry should be a date in the future/i)).not.toBeInTheDocument();
    });

    test('should render the Create Account button instead of Next for clients', () => {
        render(TestComponent(UserType.CLIENT));

        expect(screen.queryByRole('button', {
            name: /next/i
        })).not.toBeInTheDocument();

        expect(screen.getByRole('button', {
            name: /create account/i
        })).toBeInTheDocument();
    });

    test('should trigger the callback when submitting as client', async () => {
        render(TestComponent(UserType.CLIENT));

        expect(screen.getByRole('button', {
            name: /create account/i
        })).toBeInTheDocument();

        const nameField = screen.getByRole('textbox', {
            name: /name/i
        });
        const numberField = screen.getByRole('textbox', {
            name: /card number/i
        });
        const month = screen.getByRole('textbox', {
            name: /expiry month/i
        });
        const year = screen.getByRole('textbox', {
            name: /expiry year/i
        });

        //Enter valid details in the field
        await userEvent.type(nameField, "Name");
        await userEvent.type(numberField, "0000111100001111");
        await userEvent.type(month, "01");
        await userEvent.type(year, "2025");

        await userEvent.click(screen.getByRole('button', {
            name: /create account/i
        }));

        await waitFor(() => {
            expect(handleSubmit).toHaveBeenCalled();
        })
    });

    test('should trigger the callback when going next as professional', async () => {
        render(TestComponent(UserType.PROFESSIONAL));

        expect(screen.getByRole('button', {
            name: /next/i
        })).toBeInTheDocument();

        const nameField = screen.getByRole('textbox', {
            name: /name/i
        });
        const numberField = screen.getByRole('textbox', {
            name: /card number/i
        });
        const month = screen.getByRole('textbox', {
            name: /expiry month/i
        });
        const year = screen.getByRole('textbox', {
            name: /expiry year/i
        });

        //Enter valid details in the field
        await userEvent.type(nameField, "Name");
        await userEvent.type(numberField, "0000111100001111");
        await userEvent.type(month, "01");
        await userEvent.type(year, "2025");

        await userEvent.click(screen.getByRole('button', {
            name: /next/i
        }));

        await waitFor(() => {
            expect(setCurrentStep).toHaveBeenCalled();
        })
    });
});