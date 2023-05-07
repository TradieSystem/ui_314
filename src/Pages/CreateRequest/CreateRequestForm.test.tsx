import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import React from "react";
import {dummyProfessionalUser} from "../../Contexts/AuthContext";
import CreateRequestForm from "./CreateRequestForm";
import {NavigationContext} from "../../Contexts/NavigationContext";
import {
    SideNavigationMenuItemProps
} from "../../Components/SideNavigation/SideNavigationMenuItem/SideNavigationMenuItem";
import {ServiceType} from "../../Types/ServiceType";
import {dummyServiceRequests} from "../../Utilities/GenerateDummyData";
import userEvent from "@testing-library/user-event";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const data = {
    ...dummyServiceRequests[0],
    statusCode: '200'
};

const TestComponent = () => {
    localStorage.setItem("user", JSON.stringify(dummyProfessionalUser));
    localStorage.setItem("auth_token", JSON.stringify("ABC123"));

    const isExpanded = true;
    const setIsExpanded = jest.fn();
    let sideNavigationMenuItems: SideNavigationMenuItemProps[] = [];
    const value = {
        isExpanded,
        setIsExpanded,
        sideNavigationMenuItems
    }

    return (
        <MemoryRouter>
            <NavigationContext.Provider value={value}>
                <CreateRequestForm/>
            </NavigationContext.Provider>
        </MemoryRouter>
    );
}

describe('<CreateRequestForm', () => {
    test('should render the <CreateRequestForm> with the correct structure', () => {
        render(TestComponent());

        expect(screen.getByText(/pick a job:/i)).toBeInTheDocument();

        // eslint-disable-next-line array-callback-return
        Object.entries(ServiceType).map(([key, value]) => {
            expect(screen.getByText(value)).toBeInTheDocument();
        });

        expect(screen.getAllByText(/description of job/i)).toHaveLength(2);

        //Should be enabled as first option (Tree Removal) is selected by default
        expect(screen.getByRole('button', {
            name: /send request form/i
        })).toBeEnabled();
    });

    test('should render the success confirmation if the request was created successfully', async () => {
        mockedAxios.post.mockResolvedValue({data: data});

        render(TestComponent());

        const submitButton = screen.getByRole('button', {
            name: /send request form/i
        });

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Created')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('The service request was created successfully')).toBeInTheDocument();
        });

        expect(screen.queryByText(/Error/i)).not.toBeInTheDocument();
    });

    test('should render the error confirmation if the request was NOT created successfully', async () => {
        mockedAxios.post.mockResolvedValue({data: "something else"});

        render(TestComponent());

        const submitButton = screen.getByRole('button', {
            name: /send request form/i
        });

        await userEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Error')).toBeInTheDocument();
        });

        await waitFor(() => {
            expect(screen.getByText('There was an error creating your request')).toBeInTheDocument();
        });

        expect(screen.queryByText(/Created/i)).not.toBeInTheDocument();
        expect(screen.queryByText('The service request was created successfully')).not.toBeInTheDocument();
    });
});