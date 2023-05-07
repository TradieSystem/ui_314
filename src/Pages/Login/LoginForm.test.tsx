import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import React from "react";
import LoginForm from "./LoginForm";
import {dummyClientUser} from "../../Contexts/AuthContext";
import userEvent from "@testing-library/user-event";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
    return (
        <MemoryRouter>
            <LoginForm/>
        </MemoryRouter>
    );
}

const successResponse = {
    user: dummyClientUser,
    access_token: "123",
    refresh_token: "abc"
}

describe('<LoginForm>', () => {
    test('should render the <LoginForm> with the correct structure', () => {
        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    test('should show an error if the email and password combination is incorrect', async () => {
        mockedAxios.post.mockResolvedValue({data: successResponse})
        render(TestComponent());

        const emailField = screen.getByRole('textbox', {
            name: /email address/i
        });

        const passwordField = screen.getByLabelText(/password/i);

        const loginButton = screen.getByRole('button', {
            name: /Login/i
        });

        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();

        await userEvent.click(emailField);
        await userEvent.type(emailField, "test@gmail.com");
        await userEvent.click(passwordField);
        await userEvent.type(passwordField, "ABC123");

        await userEvent.click(loginButton);

        await waitFor(() => {
           expect(screen.getByText("Good job!")).toBeInTheDocument();
        });

        expect(screen.queryByText("Wrong Credentials")).not.toBeInTheDocument();
    });

    test('should show a success message if the email and password combination is correct', async () => {
        mockedAxios.post.mockResolvedValue({data: "error"})
        render(TestComponent());

        const emailField = screen.getByRole('textbox', {
            name: /email address/i
        });

        const passwordField = screen.getByLabelText(/password/i);

        const loginButton = screen.getByRole('button', {
            name: /Login/i
        });

        expect(emailField).toBeInTheDocument();
        expect(passwordField).toBeInTheDocument();

        await userEvent.click(emailField);
        await userEvent.type(emailField, "test@gmail.com");
        await userEvent.click(passwordField);
        await userEvent.type(passwordField, "ABC123");

        await userEvent.click(loginButton);

        await waitFor(() => {
            expect(screen.getByText("Wrong Credentials")).toBeInTheDocument();
        });

        expect(screen.queryByText("Good job!")).not.toBeInTheDocument();
    });

    test('should show an error if the email is invalid format', () => {

    });

    test('should show an error if the password is empty', () => {

    });
});