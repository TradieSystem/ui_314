import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Formik} from "formik";
import userEvent from "@testing-library/user-event";
import {EditUserFields} from "../EditProfileForm";
import {EditProfileBillingOut} from "./EditProfileBillingOut";

const initialValues: Partial<EditUserFields> = {
    outgoingCCName: "",
    outgoingCCNumber: "",
    outgoingCCCVV: "",
    outgoingCCExpiryMonth: "",
    outgoingCCExpiryYear: "",
}

const onSubmit = jest.fn();
const setBillingOutValid = jest.fn();

const TestComponent = () => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <EditProfileBillingOut setBillingOutValid={setBillingOutValid}/>
        </Formik>
    )
}

describe('<EditProfileBillingOut>', () => {
    test('should render the <EditProfileBillingOut> with the correct structure', () => {
        render(TestComponent());

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
    });

    test('should trigger the callback function when the billing out details are changed', async () => {
        render(TestComponent());

        const cardNumber = screen.getByRole('textbox', {
            name: /card number/i
        });

        await userEvent.type(cardNumber, '50');

        await waitFor(() => {
            expect(setBillingOutValid).toHaveBeenCalled();
        });
    });

    test('should display an error if the expiry of the card is not valid', async () => {
        render(TestComponent());

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
});