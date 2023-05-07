import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Formik} from "formik";
import userEvent from "@testing-library/user-event";
import {EditUserFields} from "../EditProfileForm";
import {EditProfileProfessionalDetails} from "./EditProfileProfessionalDetails";
import {User} from "../../../../Types/User";
import {dummyClientUser, dummyProfessionalUser} from "../../../../Contexts/AuthContext";

const initialValues: Partial<EditUserFields> = {
    incomingCCName: "",
    incomingCCNumber: "",
    incomingCCCVV: "",
    incomingCCExpiryYear: "",
    incomingCCExpiryMonth: "",
}

const onSubmit = jest.fn();
const setProfessionalDetailsValid = jest.fn();

const TestComponent = (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <EditProfileProfessionalDetails setProfessionalDetailsValid={setProfessionalDetailsValid}/>
        </Formik>
    )
}

describe('<EditProfileProfessionalDetails>', () => {
    test('should render the <EditProfileProfessionalDetails> with the correct structure for a professional', () => {
        render(TestComponent(dummyProfessionalUser));

        expect(screen.getByRole('textbox', {
            name: /name/i
        })).toBeVisible();
        expect(screen.getByRole('textbox', {
            name: /card number/i
        })).toBeVisible();
        expect(screen.getByLabelText(/cvv/i)).toBeVisible();
        expect(screen.getByRole('textbox', {
            name: /expiry month/i
        })).toBeVisible();
        expect(screen.getByRole('textbox', {
            name: /expiry year/i
        })).toBeVisible();

        expect(screen.getByText(/update professional details/i)).toBeVisible();
    });

    test('should render the <EditProfileProfessionalDetails> with the correct structure for a client', () => {
        render(TestComponent(dummyClientUser));

        expect(screen.getByText(/link professional account/i)).toBeVisible();
    });

    test('should trigger the callback function when the professional details are changed', async () => {
        render(TestComponent(dummyClientUser));

        const cardNumber = screen.getByRole('textbox', {
            name: /card number/i
        });

        await userEvent.type(cardNumber, '50');

        await waitFor(() => {
            expect(setProfessionalDetailsValid).toHaveBeenCalled();
        });
    });

    test('should display an error if the expiry of the card is not valid', async () => {
        render(TestComponent(dummyProfessionalUser));

        const month = screen.getByRole('textbox', {
            name: /expiry month/i
        });

        const year = screen.getByRole('textbox', {
            name: /expiry year/i
        });

        await userEvent.type(month, "02");
        await userEvent.type(year, "1999");

        await waitFor(() => {
            expect(screen.getByRole('heading', {
                name: /\* card expiry invalid/i
            })).toBeVisible();
        });

        //Should disappear if the expiry is now valid
        await userEvent.clear(month);
        await userEvent.clear(year);

        await userEvent.type(month, "02");
        await userEvent.type(year, "2030");

        await waitFor(() => {
            expect(screen.queryByRole('heading', {
                name: /\* card expiry invalid/i
            })).not.toBeInTheDocument();
        });
    });

    test('should display an error if the user type is client and they have not provided all the required details', async () => {
        render(TestComponent(dummyClientUser));

        const name = screen.getByRole('textbox', {
            name: /name/i
        });

        await userEvent.type(name, "Name");

        await waitFor(() => {
            expect(screen.getAllByText(/required/i)).toHaveLength(2);
        })
    });
});