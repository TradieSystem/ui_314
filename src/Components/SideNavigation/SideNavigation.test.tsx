import React from "react";
import {MemoryRouter} from "react-router-dom";
import {SideNavigationMenuItem, SideNavigationMenuItemProps} from "./SideNavigationMenuItem/SideNavigationMenuItem";
import {NavigationContext} from "../../Contexts/NavigationContext";
import ArticleIcon from "@mui/icons-material/Article";
import {UserType} from "../../Types/Account";
import {RoutesEnum} from "../../Routes";
import {User} from "../../Types/User";
import SideNavigation from "./SideNavigation";
import {render, screen} from "@testing-library/react";
import {dummyClientUser, dummyProfessionalUser} from "../../Contexts/AuthContext";

const TestComponentExpanded = (user: User) => {
    const isExpanded = true;
    const setIsExpanded = jest.fn();
    localStorage.setItem("user", JSON.stringify(user));

    let sideNavigationMenuItems: SideNavigationMenuItemProps[] = [
        {
            icon: <ArticleIcon/>,
            text: user?.userType === UserType.PROFESSIONAL ? 'Request History' : 'My Requests',
            route: RoutesEnum.REQUEST_HISTORY
        },
    ];
    const value = {
        isExpanded,
        setIsExpanded,
        sideNavigationMenuItems
    }
    return (
        <MemoryRouter>
            <NavigationContext.Provider value={value}>
                <SideNavigation/>
            </NavigationContext.Provider>
        </MemoryRouter>
    );
}

const TestComponentCondensed = (user: User) => {
    const isExpanded = false;
    const setIsExpanded = jest.fn();
    localStorage.setItem("user", JSON.stringify(user));

    let sideNavigationMenuItems: SideNavigationMenuItemProps[] = [
        {
            icon: <ArticleIcon/>,
            text: user?.userType === UserType.PROFESSIONAL ? 'Request History' : 'My Requests',
            route: RoutesEnum.REQUEST_HISTORY
        },
    ];
    const value = {
        isExpanded,
        setIsExpanded,
        sideNavigationMenuItems
    }
    return (
        <MemoryRouter>
            <NavigationContext.Provider value={value}>
                <SideNavigation/>
            </NavigationContext.Provider>
        </MemoryRouter>
    );
}

describe('<SideNavigation>', () => {
    test('should render the <SideNavigation> with the correct structure for a client when expanded', () => {
        render(TestComponentExpanded(dummyClientUser));

        //My Requests - Client specific
        expect(screen.getByTestId('ArticleIcon')).toBeVisible();
        expect(screen.getByRole('heading', {
            name: /my requests/i
        })).toBeVisible();

        //Shared for user types
        expect(screen.getByTestId('AccountCircleIcon')).toBeVisible();
        expect(screen.getByRole('heading', {
            name: /account profile/i
        })).toBeVisible();
        expect(screen.getByTestId('LogoutIcon')).toBeVisible();
        expect(screen.getByRole('heading', {
            name: /logout/i
        })).toBeVisible();

        //Should be expanded
        expect(screen.getByTestId('ChevronLeftIcon')).toBeVisible();
    });

    test('should render the <SideNavigation> with the correct structure for a professional when expanded', () => {
        render(TestComponentExpanded(dummyProfessionalUser));

        expect(screen.queryByTestId('ArticleIcon')).toBeVisible();

        //My Requests NOT visible - Client specific
        expect(screen.queryByRole('heading', {
            name: /my requests/i
        })).not.toBeInTheDocument();

        expect(screen.getByRole('heading', {
            name: /request history/i
        })).toBeVisible();

        //Shared for user types
        expect(screen.getByTestId('AccountCircleIcon')).toBeVisible();
        expect(screen.getByRole('heading', {
            name: /account profile/i
        })).toBeVisible();
        expect(screen.getByTestId('LogoutIcon')).toBeVisible();
        expect(screen.getByRole('heading', {
            name: /logout/i
        })).toBeVisible();

        //Should be expanded
        expect(screen.getByTestId('ChevronLeftIcon')).toBeVisible();
    });

    test('should render the <SideNavigation> with the correct structure for a client when condensed', () => {
        render(TestComponentCondensed(dummyClientUser));

        //My Requests - Client specific
        expect(screen.getByTestId('ArticleIcon')).toBeVisible();
        expect(screen.queryByRole('heading', {
            name: /my requests/i
        })).not.toBeInTheDocument();

        //Shared for user types
        expect(screen.getByTestId('AccountCircleIcon')).toBeVisible();
        expect(screen.queryByRole('heading', {
            name: /account profile/i
        })).not.toBeInTheDocument();
        expect(screen.getByTestId('LogoutIcon')).toBeVisible();
        expect(screen.queryByRole('heading', {
            name: /logout/i
        })).not.toBeInTheDocument();

        //Should be expanded
        expect(screen.getByTestId('ChevronRightIcon')).toBeVisible();
    });

    test('should render the <SideNavigation> with the correct structure for a professional when condensed', () => {
        render(TestComponentCondensed(dummyProfessionalUser));

        expect(screen.queryByTestId('ArticleIcon')).toBeVisible();

        //My Requests NOT visible - Client specific
        expect(screen.queryByRole('heading', {
            name: /my requests/i
        })).not.toBeInTheDocument();

        expect(screen.queryByRole('heading', {
            name: /request history/i
        })).not.toBeInTheDocument();

        //Shared for user types
        expect(screen.getByTestId('AccountCircleIcon')).toBeVisible();
        expect(screen.queryByRole('heading', {
            name: /account profile/i
        })).not.toBeInTheDocument();
        expect(screen.getByTestId('LogoutIcon')).toBeVisible();
        expect(screen.queryByRole('heading', {
            name: /logout/i
        })).not.toBeInTheDocument();

        //Should be expanded
        expect(screen.getByTestId('ChevronRightIcon')).toBeVisible();
    });
});