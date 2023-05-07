import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import EditProfileForm from "./EditProfileForm";
import {MemoryRouter} from "react-router-dom";
import {dummyClientUser} from "../../../Contexts/AuthContext";
import userEvent from "@testing-library/user-event";
import axios from "axios";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
    localStorage.setItem("user", JSON.stringify(dummyClientUser));
    localStorage.setItem("access_token", JSON.stringify("ABC123"));

    return (
        <MemoryRouter>
            <EditProfileForm/>
        </MemoryRouter>
    )
}

describe('<EditProfileForm>', () => {
    test('should render the <EditProfileForm> with the correct structure', () => {
        render(TestComponent());

        //Check the general panel header is there
        expect(screen.getByText(/general/i)).toBeInTheDocument();

        //Check buttons are there
        expect(screen.getByRole('button', {
            name: /save/i
        })).toBeInTheDocument();

        expect(screen.getByRole('button', {
            name: /cancel/i
        })).toBeInTheDocument();
    });

    test('should display success message if user was updated successfully', async () => {
        mockedAxios.put.mockResolvedValue({data: dummyClientUser})
        render(TestComponent());

        await userEvent.click(screen.getByRole('button', {
            name: /save/i
        }));

        await waitFor(() => {
           expect(screen.getByText("Updated")).toBeInTheDocument();
        });

        expect(screen.queryByText("Error")).not.toBeInTheDocument();
    });

    test('should display error message if user was NOT updated successfully', async () => {
        mockedAxios.put.mockResolvedValue({data: "bad data"})
        render(TestComponent());

        await userEvent.click(screen.getByRole('button', {
            name: /save/i
        }));

        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
        });

        expect(screen.queryByText("Updated")).not.toBeInTheDocument();
    });
});