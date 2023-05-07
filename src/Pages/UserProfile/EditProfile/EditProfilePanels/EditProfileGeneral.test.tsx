import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Formik} from "formik";
import userEvent from "@testing-library/user-event";
import {EditUserFields} from "../EditProfileForm";
import {EditProfileGeneral} from "./EditProfileGeneral";

const initialValues: Partial<EditUserFields> = {
    firstname: "",
    lastname: "",
    password: "",
    mobile: "",
}

const onSubmit = jest.fn();
const setGeneralValid = jest.fn();

const TestComponent = () => {
    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            <EditProfileGeneral setGeneralValid={setGeneralValid}/>
        </Formik>
    )
}

describe('<EditProfileGeneral>', () => {
    test('should render the <EditProfileGeneral> with the correct structure', () => {
        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /first name/i
        })).toBeVisible();

        expect(screen.getByRole('textbox', {
            name: /last name/i
        })).toBeVisible();

        expect(screen.getByLabelText(/password/i)).toBeVisible();

        expect(screen.getByRole('textbox', {
            name: /mobile/i
        })).toBeVisible();

    });

    test('should trigger the callback function when the general details are changed', async () => {
        render(TestComponent());

        const firstNameField = screen.getByRole('textbox', {
            name: /first name/i
        })

        await userEvent.type(firstNameField, 'name');

        await waitFor(() => {
            expect(setGeneralValid).toHaveBeenCalled();
        });
    });
});