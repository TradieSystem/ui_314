import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import ThemedSelect from "./ThemedSelect";
import {MenuItem} from "@mui/material";
import {ServiceType} from "../../Types/ServiceType";
import userEvent from "@testing-library/user-event";

describe('<ThemedSelect>', () => {
    test('should render the <ThemedSelect> with the correct structure', () => {
        const onChangeMock = jest.fn();
        render(
            <ThemedSelect
                size={'small'}
                id={'test component'}
                defaultValue={'test select'}
                onChange={onChangeMock}
            >
                {Object.entries(ServiceType).map(([key, value]) => {
                    return (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    )
                })}
            </ThemedSelect>
        );

        //Drop down arrow
        expect(screen.getByTestId('ArrowDropDownIcon')).toBeVisible();
        //Text field component
        expect(screen.getByRole('textbox', {
            hidden: true
        })).toHaveDisplayValue('test select');
        //Attached button
        expect(screen.getByRole('button', {
            name: /​/i
        })).toBeVisible();
    });

    test('should perform the correct actions when the select is clicked', async () => {
        const onChangeMock = jest.fn();
        render(
            <ThemedSelect
                size={'small'}
                id={'test component'}
                defaultValue={'test select'}
                onChange={onChangeMock}
            >
                {Object.entries(ServiceType).map(([key, value]) => {
                    return (
                        <MenuItem key={key} value={value}>
                            {value}
                        </MenuItem>
                    )
                })}
            </ThemedSelect>
        );

        const buttonTrigger = screen.getByRole('button', {
            name: /​/i
        });
        await userEvent.click(buttonTrigger);

        await waitFor(() => {
            expect(screen.getByRole('option', {
                name: /tree removal/i
            })).toBeVisible();
        });

        await waitFor(() => {
            expect(screen.getByRole('option', {
                name: /roof cleaning/i
            })).toBeVisible();
        });

        await waitFor(() => {
            expect(screen.getByRole('option', {
                name: /fence installation/i
            })).toBeVisible();
        });

        await waitFor(() => {
            expect(screen.getByRole('option', {
                name: /oven repairs/i
            })).toBeVisible();
        });

        await waitFor(() => {
            expect(screen.getByRole('option', {
                name: /plumbing/i
            })).toBeVisible();
        });
    });
});