import React from "react";
import {dummyServiceRequests} from "../../../../../Utilities/GenerateDummyData";
import {RequestSummaryEdit} from "./RequestSummaryEdit";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {ServiceType} from "../../../../../Types/ServiceType";

const request = dummyServiceRequests[0];
const setServiceTypeEdit = jest.fn();
const setServiceDescEdit = jest.fn();

const TestComponent = () => {
    return (
        <RequestSummaryEdit
            request={request}
            setServiceTypeEdit={setServiceTypeEdit}
            setServiceDescEdit={setServiceDescEdit}
        />
    );
}

describe('<RequestSummaryEdit>', () => {
    test('should render the <RequestSummaryEdit> with the correct structure', () => {
        render(TestComponent());

        expect(screen.getByText(/service type:/i)).toBeVisible();

        //The drop down
        expect(screen.getByRole('button', {
            name: /fence installation/i
        })).toBeVisible();
        expect(screen.getByTestId('ArrowDropDownIcon')).toBeVisible();

        //Edit description
        expect(screen.getByText(/description:/i)).toBeVisible();
        expect(screen.getByRole('textbox')).toBeVisible();
    });

    test('should show the dropdown of service types when drop down selected', async () => {
        render(TestComponent());

        expect(screen.getByText(/service type:/i)).toBeVisible();

        const button = screen.getByRole('button', {
            name: /fence installation/i
        });

        await userEvent.click(button);

        await waitFor(() => {
            //wait for some other service to be visible
            expect(screen.getByText(/plumbing/i)).toBeVisible();
        });
    });

    test('should trigger setServiceDescEdit callback when onChange of select', async () => {
        render(TestComponent());

        expect(screen.getByText(/service type:/i)).toBeVisible();

        const button = screen.getByRole('button', {
            name: /fence installation/i
        });

        await userEvent.click(button);

        await waitFor(() => {
            //wait for some other service to be visible
            expect(screen.getByText(/plumbing/i)).toBeVisible();
        });

        await userEvent.click(screen.getByText(/plumbing/i));

        await waitFor(() => {
           expect(setServiceTypeEdit).toHaveBeenCalledWith(ServiceType.PLUMBING);
        });

        expect(setServiceDescEdit).not.toHaveBeenCalled();
    });

    test('should trigger setServiceTypeEdit when onChange of text field', async () => {
        render(TestComponent());

        expect(screen.getByText(/service type:/i)).toBeVisible();

        const textField = screen.getByRole('textbox');

        await userEvent.click(textField);
        await userEvent.type(textField, "new description");

        await waitFor(() => {
            expect(screen.getByRole("textbox")).toHaveValue("new description");
        });

        await waitFor(() => {
            expect(setServiceDescEdit).toHaveBeenCalledWith("new description");
        });

        expect(setServiceTypeEdit).not.toHaveBeenCalled();
    });
});