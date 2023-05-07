import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import React from "react";
import AvailableRequests from "./AvailableRequests";
import {NavigationContext} from "../../Contexts/NavigationContext";
import {
    SideNavigationMenuItemProps
} from "../../Components/SideNavigation/SideNavigationMenuItem/SideNavigationMenuItem";
import ArticleIcon from "@mui/icons-material/Article";
import {RoutesEnum} from "../../Routes";
import {dummyProfessionalUser} from "../../Contexts/AuthContext";

jest.mock('./AvailableRequestsTable/AvailableRequestsTable', () => () => {
    return (
        <div>
            Mocked Table
        </div>
    )
});

const TestComponent = () => {
    const isExpanded = true;
    const setIsExpanded = jest.fn();
    localStorage.setItem("user", JSON.stringify(dummyProfessionalUser));

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
                <AvailableRequests/>
            </NavigationContext.Provider>
        </MemoryRouter>
    )
}

describe('<AvailableRequests>', () => {
    test('should render the structure of the page of <AvailableRequests>', () => {
        render(TestComponent());

        expect(screen.getByRole('heading', {
            name: /available requests/i
        })).toBeVisible();

        expect(screen.getByText('Mocked Table')).toBeInTheDocument();
    });
});