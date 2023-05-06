import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {MemoryRouter} from "react-router-dom";
import {SideNavigationMenuItem, SideNavigationMenuItemProps} from "./SideNavigationMenuItem";
import {NavigationContext} from "../../../Contexts/NavigationContext";
import {ImportContacts} from "@mui/icons-material";
import userEvent from "@testing-library/user-event";
import {RoutesEnum} from "../../../Routes";
import {createMemoryHistory} from 'history'

const TestComponentExpanded = (props?: SideNavigationMenuItemProps) => {
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
                <SideNavigationMenuItem
                    text={props?.text}
                    icon={props?.icon}
                    route={props?.route}
                    onClick={props?.onClick}
                />
            </NavigationContext.Provider>
        </MemoryRouter>
    );
}

describe('<SideNavigationMenuItem>', () => {
    test('should render the <SideNavigationMenuItem> with the correct structure when text and icon props passed in', () => {
        render(TestComponentExpanded({text: 'Test Text', icon: <ImportContacts />}));

        expect(screen.getByTestId('ImportContactsIcon')).toBeVisible();
        expect(screen.getByRole('heading', {
            name: /test text/i
        })).toBeVisible();
    });

    test('should trigger the onClick function when menu item clicked', async () => {
        //Mock function to pass into the onClick prop
        const onClickMock = jest.fn();
        render(TestComponentExpanded({text: 'Test Text', icon: <ImportContacts />, onClick: onClickMock, route: RoutesEnum.CREATE_REQUEST}));

        //Mocked memory history to check the route changes
        const history = createMemoryHistory({ initialEntries: [RoutesEnum.CREATE_REQUEST] });

        //The menu item
        const menuItem = screen.getByTestId('ImportContactsIcon');

        expect(menuItem).toBeVisible();
        expect(screen.getByRole('heading', {
            name: /test text/i
        })).toBeVisible();

        //Mock user clicking the button, and expect the mock function to have been called
        await userEvent.click(menuItem);

        await waitFor(() => {
            expect(onClickMock).toHaveBeenCalled();
        });

        expect(history.location.pathname).toBe(RoutesEnum.CREATE_REQUEST);
    });
});