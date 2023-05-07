import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import ThemedTextField from "./ThemedTextField";
import userEvent from "@testing-library/user-event";

describe('<ThemedTextField>', () => {
   test('should render the <ThemedTextField> with the correct structure', () => {
       render(
           <ThemedTextField
                label={"test field"}
                value={"entered data"}
           />
       );

       expect(screen.getByRole('textbox', {
           name: /test field/i
       })).toBeVisible();

       expect(screen.getByRole('textbox', {
           name: /test field/i
       })).toHaveDisplayValue('entered data');
   });

    test('should perform the correct callbacks on <ThemedTextField> when value changes', async () => {
        const onChangeCallbackMock = jest.fn();

        render(
            <ThemedTextField
                label={"test field"}
                onChange={onChangeCallbackMock}
            />
        );

        const textField = screen.getByRole('textbox', {
            name: /test field/i
        });

        expect(textField).toBeVisible();

        await userEvent.click(textField);
        await userEvent.type(textField, 'entered data');
        await waitFor(() => {
            expect(textField).toHaveValue('entered data');
        });

        await waitFor(() => {
            expect(onChangeCallbackMock).toHaveBeenCalled();
        });
    });
});