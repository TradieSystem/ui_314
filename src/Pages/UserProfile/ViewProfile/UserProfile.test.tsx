import {render, screen} from "@testing-library/react";
import React from "react";
import UserProfile from "./UserProfile";
import {MemoryRouter} from "react-router-dom";
import {dummyClientUser} from "../../../Contexts/AuthContext";

const TestComponent = () => {
    localStorage.setItem("user", JSON.stringify(dummyClientUser));

    return (
        <MemoryRouter>
            <UserProfile/>
        </MemoryRouter>
    )
}

describe('<UserProfile>', () => {
    test('should render the <UserProfile> with the correct structure', () => {
        render(TestComponent());

        expect(screen.getByTestId('AccountCircleSharpIcon')).toBeInTheDocument();
        expect(screen.getByText(/adam adams/i)).toBeInTheDocument();
        expect(screen.getByText(/client/i)).toBeInTheDocument();
        expect(screen.getByText(/contact details:/i)).toBeInTheDocument();
        expect(screen.getByText(/mobile:/i)).toBeInTheDocument();
        expect(screen.getByText(/0411222333/i)).toBeInTheDocument();
        expect(screen.getByText(/email:/i)).toBeInTheDocument();
        expect(screen.getByText(/adam@adam\.com/i)).toBeInTheDocument();
        expect(screen.getByText(/address:/i)).toBeInTheDocument();
        expect(screen.getByText(/1 adamson street/i)).toBeInTheDocument();
        expect(screen.getByText(/liverpool 2170/i)).toBeInTheDocument();
    });
});