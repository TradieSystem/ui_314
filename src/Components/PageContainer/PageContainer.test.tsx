import {render, screen} from "@testing-library/react";
import React, {useState} from "react";
import PageContainer from "./PageContainer";
import {NavigationContext, NavigationContextContextProvider} from "../../Contexts/NavigationContext";
import {MemoryRouter} from "react-router-dom";
import {SideNavigationMenuItemProps} from "../SideNavigation/SideNavigationMenuItem/SideNavigationMenuItem";
import ArticleIcon from "@mui/icons-material/Article";
import {RoutesEnum} from "../../Routes";

interface TestProps {
    title?: string;
    subtitle?: string;
    showChildren?: boolean;
}

const TestComponent = (props: TestProps) => {
    return (
        <MemoryRouter>
            <NavigationContextContextProvider>
                <PageContainer
                    title={props.title || 'Test title'}
                    subtitle={props.subtitle}
                >
                    <>
                        {
                            props.showChildren &&
                            <button>
                                Test button
                            </button>
                        }
                    </>
                </PageContainer>
            </NavigationContextContextProvider>
        </MemoryRouter>
    );
}

const TestComponentExpanded = (props: TestProps) => {
    const [isExpanded, setIsExpanded] = useState<boolean>(true);
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
                <PageContainer
                    title={props.title || 'Test title'}
                    subtitle={props.subtitle}
                >
                    <>
                        {
                            props.showChildren &&
                            <button>
                                Test button
                            </button>
                        }
                    </>
                </PageContainer>
            </NavigationContext.Provider>
        </MemoryRouter>
    );
}

describe('<PageContainer>', () => {
    test('should render the <PageContainer> with the correct structure when title passed in', () => {
        render(<TestComponent/>);

        expect(screen.getByRole('heading', {
            name: /test title/i
        })).toBeVisible();

        expect(screen.queryByRole('heading', {
            name: /subtitle/i
        })).not.toBeInTheDocument();

        expect(screen.queryByRole('button', {
            name: /test button/i
        })).not.toBeInTheDocument();
    });

    test('should render the <PageContainer> with the correct structure when title and subtitle are passed in', () => {
        render(<TestComponent subtitle={'Subtitle'}/>);

        expect(screen.getByRole('heading', {
            name: /test title/i
        })).toBeVisible();

        expect(screen.getByRole('heading', {
            name: /subtitle/i
        })).toBeVisible();

        expect(screen.queryByRole('button', {
            name: /test button/i
        })).not.toBeInTheDocument();
    });

    test('should render the <PageContainer> with the correct structure when title, subtitle and children passed in', () => {
        render(<TestComponent subtitle={'Subtitle'} showChildren={true}/>);

        expect(screen.getByRole('heading', {
            name: /test title/i
        })).toBeVisible();

        expect(screen.getByRole('heading', {
            name: /subtitle/i
        })).toBeVisible();

        expect(screen.getByRole('button', {
            name: /test button/i
        })).toBeVisible();
    });

    test('should render the <PageContainer> with the side navigation state correct', () => {
        render(<TestComponentExpanded/>);

        //The condense icon is visible
        expect(screen.getByTestId('ChevronLeftIcon')).toBeVisible();

        //Text should be visible
        expect(
            screen.getByRole('heading', {
                name: /account profile/i
            })
        ).toBeVisible();

        expect(
            screen.getByRole('heading', {
                name: /logout/i
            })
        ).toBeVisible();
    });
});