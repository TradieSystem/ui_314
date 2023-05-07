import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import SignUpConfirmation from "./SignUpConfirmation";
import {dummyClientUser} from "../../Contexts/AuthContext";
import {MemoryRouter} from "react-router-dom";
import {createMemoryHistory} from "history";
import {RoutesEnum} from "../../Routes";
import userEvent from "@testing-library/user-event";

const TestComponent = () => {
    return (
        <MemoryRouter>
            <SignUpConfirmation createdUser={dummyClientUser}/>
        </MemoryRouter>
    )
}
describe('<SignUpConfirmation>', () => {
    test('should render the <SignUpConfirmation> with the correct structure', () => {
        render(TestComponent());

        expect(screen.getByRole('heading', {
            name: /account created/i
        })).toBeVisible();
        expect(
            screen.getByText(
                /an account has successfully been created with the following details:/i)
        ).toBeInTheDocument();
        expect(screen.getByText(/client/i)).toBeInTheDocument();
        expect(screen.getByText(/adam@adam\.com/i)).toBeInTheDocument();
        expect(screen.getByText(/adam adams/i)).toBeInTheDocument();
        expect(screen.getByText(/0411222333/i)).toBeInTheDocument();

        expect(screen.getByRole('button', {
            name: /proceed to login/i
        })).toBeVisible();
    });

    test('should route to the login when confirmation dismissed', async () => {
        render(TestComponent());

        const button = screen.getByRole('button', {
            name: /proceed to login/i
        });

        await userEvent.click(button);

        const history = createMemoryHistory({ initialEntries: [RoutesEnum.LOGIN] });
        await waitFor(() => {
            expect(history.location.pathname).toBe(RoutesEnum.LOGIN);
        });
    });
});