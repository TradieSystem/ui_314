import React from 'react';
import {Button} from "@mui/material";
import {LoadingButton, LoadingButtonProps} from "@mui/lab";

/**
 * Interface to describe {@link ThemedButton} properties
 */
export interface ThemedButtonProps extends LoadingButtonProps {
    /**
     * (Optional) property to set the button to a loading button
     */
    loadingButton?: boolean;
    /**
     * (Optional) override to the button style {@code outlined}, {@code text}, {@code contained}
     */
    variantOverride?: LoadingButtonProps['variant'];
}

export const ThemedButton = ({loadingButton, variantOverride, ...props}: ThemedButtonProps) => {
    return !loadingButton ?
        <Button
            variant={variantOverride ? variantOverride : 'outlined'}
            sx={{
                background: !variantOverride ? "rgb(238,179,144)" : "",
                borderColor: "#DB5B13",
                borderWidth: 1,
                fontFamily:'Fahrenheit',
                color: "black",
                '&:hover': {
                    background: "rgb(238,179,144)",
                    borderColor: "#DB5B13",
                    borderWidth: 1.5,
                    boxShadow: 0,
                },
                textTransform: "None"
            }}
            {...props}
        /> :
        <LoadingButton
            variant={'outlined'}
            sx={{
                background: "rgb(238,179,144)",
                borderColor: "#DB5B13",
                borderWidth: 1,
                color: "black",
                fontFamily:'Fahrenheit',
                boxShadow: 0,
                '&:hover': {
                    background: "rgb(238,179,144)",
                    borderColor: "#DB5B13",
                    borderWidth: 1.5,
                    boxShadow: 0,
                },
                textTransform: "None"
            }}
            {...props}
        />;
}