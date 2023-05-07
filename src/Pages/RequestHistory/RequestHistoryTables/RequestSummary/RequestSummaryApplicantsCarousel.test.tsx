import axios from "axios";
import React from "react";
import {RequestSummaryApplicantsCarousel, ServiceRequestApplicationCard} from "./RequestSummaryApplicantsCarousel";
import {ServiceRequest, ServiceRequestApplicationStatus, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import {ServiceType} from "../../../../Types/ServiceType";
import {dummyClientUser} from "../../../../Contexts/AuthContext";
import {render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testCards: ServiceRequestApplicationCard[] = [
    {
        requestID: 1,
        offerDate: "01/04/2024",
        professionalID: 1,
        professionalName: "Some Professional",
        applicationStatus: ServiceRequestApplicationStatus.PENDING,
        applicationID: 1,
        cost: 500.50
    },
    {
        requestID: 1,
        offerDate: "01/04/2024",
        professionalID: 3,
        professionalName: "Another Professional",
        applicationStatus: ServiceRequestApplicationStatus.PENDING,
        applicationID: 12,
        cost: 20.50
    }
]

const request: ServiceRequest = {
    requestID: 1,
    requestDate: new Date("01/03/2023"),
    serviceType: ServiceType.PLUMBING,
    requestStatus: ServiceRequestStatus.NEW,
    postcode: "2000",
    clientID: 2
}

const TestComponent = () => {
    localStorage.setItem("user", JSON.stringify(dummyClientUser));
    localStorage.setItem("auth_token", JSON.stringify("ABC123"));

    return (
        <MemoryRouter>
            <RequestSummaryApplicantsCarousel request={request} cards={testCards}/>
        </MemoryRouter>
    )
}

describe('<RequestSummaryApplicantsCarousel>', () => {
    test('should render the <RequestSummaryApplicantsCarousel> with the correct structure', () => {
        render(TestComponent());

        //Professional 1 card
        expect(screen.getByText(/some professional/i)).toBeVisible();
        expect(screen.getByText('1')).toBeVisible();
        expect(screen.getAllByText(/Plumbing/i)).toHaveLength(2);

        //Professional 2 card
        expect(screen.getByText(/another professional/i)).toBeVisible();
        expect(screen.getByText('12')).toBeVisible();

        //Accept buttons x 2
        expect(screen.getAllByTestId("accept-button")).toHaveLength(2);
    });

    test('should display a success message if professional was accepted successfully', async () => {
        mockedAxios.put.mockResolvedValue({data: testCards[0]});

        render(TestComponent());
        expect(screen.getByText(/some professional/i)).toBeVisible();

        const acceptedButtons = screen.getAllByTestId("accept-button");

        await userEvent.click(acceptedButtons[0]);

        await waitFor(() => {
           expect(screen.getByText("Success")).toBeInTheDocument();
        });

        expect(screen.queryByText("Error")).not.toBeInTheDocument();
    });

    test('should display an error message if a professional was not accepted successfully', async () => {
        mockedAxios.put.mockResolvedValue({data: "something else"});

        render(TestComponent());
        expect(screen.getByText(/some professional/i)).toBeVisible();

        const acceptedButtons = screen.getAllByTestId("accept-button");

        await userEvent.click(acceptedButtons[0]);

        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
        });

        expect(screen.queryByText("Success")).not.toBeInTheDocument();
    });
});