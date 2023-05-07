import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Formik} from "formik";
import {EditProfileButtonControls} from "./EditProfileButtonControls";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

const initialValues = {}
const onSubmit = jest.fn();

const TestComponent = (submitting: boolean, disabled: boolean) => {
    return (
        <MemoryRouter>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <EditProfileButtonControls submitting={submitting} disabled={disabled} handleSubmit={onSubmit}/>
            </Formik>
        </MemoryRouter>
    );
}

describe('<EditProfileButtonControls>', () => {
    test('should render the <EditProfileButtonControls> with the correct structure', () => {
        render(TestComponent(false, false));

        expect(screen.getByRole('button', {
            name: /cancel/i
        })).toBeVisible();
        expect(screen.getByRole('button', {
            name: /save/i
        })).toBeVisible();
    });

    test('should not have Save text on submit button if submitting set to true', () => {
        render(TestComponent(true, false));

        expect(screen.queryByRole('button', {
            name: /save/i
        })).not.toBeInTheDocument();
    });

    test('should trigger onSubmit if Save clicked', async () => {
        render(TestComponent(false, false));

        const button = screen.getByRole('button', {
            name: /save/i
        });

        await userEvent.click(button);
        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalled();
        })
    });

    test('should disable Save button if disabled set to true', () => {
        render(TestComponent(false, true));

        expect(screen.getByRole('button', {
            name: /save/i
        })).toBeDisabled();
    });
});