import React from "react";
import {dummyServiceRequests} from "../../../../Utilities/GenerateDummyData";
import {ServiceRequest, ServiceRequestApplicationStatus} from "../../../../Types/ServiceRequest";
import {ApplicationConfirmationDialog} from "./ApplicationConfirmationDialog";
import {dummyProfessionalUser} from "../../../../Contexts/AuthContext";
import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

//Mocked values
const setShowConfirmationDialog = jest.fn();
const request: ServiceRequest = dummyServiceRequests[2];
const data = {
    requestID: 3,
    applicationID: 1,
    offerDate: new Date("05/05/2023"),
    professionalID: dummyProfessionalUser.user_id,
    cost: 500.50,
    applicationStatus: ServiceRequestApplicationStatus.APPROVED
}

const TestComponent = () => {
    localStorage.setItem("user", JSON.stringify(dummyProfessionalUser));
    localStorage.setItem("auth_token", JSON.stringify("ABC123"));

    return (
        <MemoryRouter>
            <ApplicationConfirmationDialog
                request={request}
                setShowConfirmationDialog={setShowConfirmationDialog}
                showConfirmationDialog={true}
            />
        </MemoryRouter>
    );
};

describe('<ApplicationConfirmationDialog>', () => {
    test('should render the <ApplicationConfirmationDialog> with the correct structure', () => {
        render(TestComponent());

        //Displayed info about service request
        expect(screen.getByRole('heading', {
            name: /apply for request/i
        })).toBeVisible();
        expect(screen.getByText(/application number:/i)).toBeVisible();
        expect(screen.getByText(/03\/03\/2023/i)).toBeVisible();
        expect(screen.getByText(/service type:/i)).toBeVisible();
        expect(screen.getByText(/oven repairs/i)).toBeVisible();
        expect(screen.getByText(/cost:/i)).toBeVisible();
        expect(screen.getByText(/additional description:/i)).toBeVisible();

        //Text field to enter cost
        expect(screen.getByRole('textbox')).toBeVisible();

        expect(screen.getByRole('button', {
            name: /cancel/i
        })).toBeVisible();

        //Button should initially be disabled
        expect(screen.getByRole('button', {
            name: /confirm/i
        })).toBeVisible();
        expect(screen.getByRole('button', {
            name: /confirm/i
        })).toBeDisabled();
    });

    test('should display an error if the entered cost is not of numeric value', async () => {
        render(TestComponent());

        expect(screen.getByRole('heading', {
            name: /apply for request/i
        })).toBeVisible();

        const textField = screen.getByRole('textbox');

        await userEvent.click(textField);
        await userEvent.type(textField, 'abc');

        await waitFor(() => {
            expect(textField).toHaveValue('abc');
        });

        //Click away from the text field
        await userEvent.click(screen.getByRole('heading', {
            name: /apply for request/i
        }));

        await waitFor(() => {
            expect(screen.getByText(/cost should be a numeric value/i)).toBeVisible();
        });

        //When the value is corrected, the warning should disappear
        await userEvent.click(textField);
        await userEvent.clear(textField);
        await userEvent.type(textField, '123.45');

        await waitFor(() => {
            expect(textField).toHaveValue('123.45');
        });

        //Click away from the text field
        await userEvent.click(screen.getByRole('heading', {
            name: /apply for request/i
        }));

        await waitFor(() => {
            expect(screen.queryByText(/cost should be a numeric value/i)).not.toBeInTheDocument();
        });
    });

    test('should enable the confirm button if the data entered is value', async () => {
        render(TestComponent());

        expect(screen.getByRole('heading', {
            name: /apply for request/i
        })).toBeVisible();

        const textField = screen.getByRole('textbox');

        await userEvent.click(textField);
        await userEvent.type(textField, '123.45');

        await waitFor(() => {
            expect(textField).toHaveValue('123.45');
        });

        expect(screen.getByRole('button', {
            name: /confirm/i
        })).toBeEnabled();
    });

    test('should successfully submit information and receive a 200 message if application made', async () => {
        mockedAxios.post.mockResolvedValue({data: data});

        render(TestComponent());

        expect(screen.getByRole('heading', {
            name: /apply for request/i
        })).toBeVisible();

        const textField = screen.getByRole('textbox');

        await userEvent.click(textField);
        await userEvent.type(textField, '123.45');

        await waitFor(() => {
            expect(textField).toHaveValue('123.45');
        });

        expect(screen.getByRole('button', {
            name: /confirm/i
        })).toBeEnabled();

        await userEvent.click(screen.getByRole('button', {
            name: /confirm/i
        }));

        //Submit button disables when submitting application
        expect(screen.getByRole('button', {
            name: /confirm/i
        })).toBeDisabled();

        await waitFor(() => {
            expect(screen.getByText('Success')).toBeInTheDocument();
        });

        expect(screen.queryByText('Error')).not.toBeInTheDocument();
    });

    test('should show an error message if there was an issue submitting the data', async () => {
        mockedAxios.post.mockResolvedValue({data: "not the data we want"});

        render(TestComponent());

        expect(screen.getByRole('heading', {
            name: /apply for request/i
        })).toBeVisible();

        const textField = screen.getByRole('textbox');

        await userEvent.click(textField);
        await userEvent.type(textField, '123.45');

        await waitFor(() => {
            expect(textField).toHaveValue('123.45');
        });

        expect(screen.getByRole('button', {
            name: /confirm/i
        })).toBeEnabled();

        await userEvent.click(screen.getByRole('button', {
            name: /confirm/i
        }));

        //Submit button disables when submitting application
        expect(screen.getByRole('button', {
            name: /confirm/i
        })).toBeDisabled();

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
        });

        expect(screen.queryByText('Success')).not.toBeInTheDocument();
    });
});