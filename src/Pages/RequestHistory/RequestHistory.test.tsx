import {MemoryRouter} from "react-router-dom";
import {NavigationContext} from "../../Contexts/NavigationContext";

import React from "react";
import {dummyClientUser, dummyProfessionalUser} from "../../Contexts/AuthContext";
import {
    SideNavigationMenuItemProps
} from "../../Components/SideNavigation/SideNavigationMenuItem/SideNavigationMenuItem";
import ArticleIcon from "@mui/icons-material/Article";
import {RoutesEnum} from "../../Routes";
import {RequestHistory} from "./RequestHistory";
import {render, screen} from "@testing-library/react";
import {User} from "../../Types/User";

const TestComponent = (user: User) => {
    const isExpanded = true;
    const setIsExpanded = jest.fn();
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("auth_token", JSON.stringify("ABC123"));

    let sideNavigationMenuItems: SideNavigationMenuItemProps[] = [
        {
            icon: <ArticleIcon/>,
            text: 'Request History',
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
                <RequestHistory/>
            </NavigationContext.Provider>
        </MemoryRouter>
    )
}

describe('<RequestHistory>', () => {
    test('should render the correct structure for the <RequestHistory> page for a professional', () => {
        render(TestComponent(dummyProfessionalUser));

        expect(screen.getByRole('heading', {
            name: /job history/i
        })).toBeVisible();
    });

    test('should render the correct structure for the <RequestHistory> page for a client', () => {
        render(TestComponent(dummyClientUser));

        expect(screen.getByRole('heading', {
            name: /my requests/i
        })).toBeVisible();
    });
});