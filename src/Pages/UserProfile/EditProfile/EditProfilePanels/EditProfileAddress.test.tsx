import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {EditUserFields} from "../EditProfileForm";
import {EditProfileAddress} from "./EditProfileAddress";
import {Formik} from "formik";
import userEvent from "@testing-library/user-event";

const initialValues: Partial<EditUserFields> = {
    streetNumber: "",
    streetName: "",
    suburb: "",
    postcode: "",
}

const onSubmit = jest.fn();
const setAddressValid = jest.fn();

const TestComponent = () => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <EditProfileAddress setAddressValid={setAddressValid}/>
        </Formik>
    )
}

describe('<EditProfileAddress>', () => {
    test('should render the <EditProfileAddress> with the correct structure', () => {
        render(TestComponent());

        expect(screen.getByText(/address/i)).toBeVisible();
        expect(screen.getByRole('textbox', {
            name: /street number/i
        })).toBeVisible();
        expect(screen.getByRole('textbox', {
            name: /street name/i
        })).toBeVisible();
        expect(screen.getByRole('textbox', {
            name: /suburb/i
        })).toBeVisible();
        expect(screen.getByRole('textbox', {
            name: /postcode/i
        })).toBeVisible();
    });

    test('should trigger the callback function when the address is changed', async () => {
        render(TestComponent());

        const streetNumber = screen.getByRole('textbox', {
            name: /street number/i
        });

        await userEvent.type(streetNumber, '50');

        await waitFor(() => {
           expect(setAddressValid).toHaveBeenCalled();
        });
    });
});