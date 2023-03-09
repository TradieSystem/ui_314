import {render, screen} from "@testing-library/react";
import React from "react";
import PageContainer from "./PageContainer";
import {NavigationContextContextProvider} from "../../Contexts/NavigationContext";
import {MemoryRouter} from "react-router-dom";

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
    )
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
});