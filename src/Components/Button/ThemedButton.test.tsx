import {render, screen} from "@testing-library/react";
import React from "react";
import {ThemedButton, ThemedButtonProps} from "./ThemedButton";

const TestComponent = (props?: ThemedButtonProps) => {
    return (
        <ThemedButton loadingButton={props?.loadingButton} variantOverride={props?.variantOverride}>
            Content
        </ThemedButton>
    );
}

describe('<ThemedButton>', () => {
    test('should render the <ThemedButton> with the expected structure if no props passed in', () => {
        render(TestComponent());

        //Button visible
        expect(screen.getByRole('button', {
            name: /content/i
        })).toBeVisible();

        //Button is NOT loading button
        expect(screen.getByRole('button', {
            name: /content/i
        })).not.toHaveClass('MuiLoadingButton-root');

        //Button is outlined variant
        expect(screen.getByRole('button', {
            name: /content/i
        })).toHaveClass('MuiButton-outlined');

        //Button should NOT be another variant
        expect(screen.getByRole('button', {
            name: /content/i
        })).not.toHaveClass('MuiButton-contained');
    });

    test('should render the loading property if passed in', () => {
        render(TestComponent({loadingButton: true}));

        //Button should be visible
        expect(screen.getByRole('button', {
            name: /content/i
        })).toBeVisible();

        //Button SHOULD be loading button
        expect(screen.getByRole('button', {
            name: /content/i
        })).toHaveClass('MuiLoadingButton-root');

        //Button should be outlined variant
        expect(screen.getByRole('button', {
            name: /content/i
        })).toHaveClass('MuiButton-outlined');

        //Button should NOT be another variant
        expect(screen.getByRole('button', {
            name: /content/i
        })).not.toHaveClass('MuiButton-contained');
    });

    test('should render the variantOverride property if passed in', () => {
        render(TestComponent({variantOverride: "contained"}));

        //Button should be visible
        expect(screen.getByRole('button', {
            name: /content/i
        })).toBeVisible();

        expect(screen.getByRole('button', {
            name: /content/i
        })).not.toHaveClass('MuiLoadingButton-root');

        expect(screen.getByRole('button', {
            name: /content/i
        })).not.toHaveClass('MuiButton-outlined');

        expect(screen.getByRole('button', {
            name: /content/i
        })).toHaveClass('MuiButton-contained');
    });
});