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
}

export const ThemedButton = ({loadingButton, ...props}: ThemedButtonProps) => {
    return !loadingButton ?
        <Button
            variant={'outlined'}
            sx={{
                background: "rgba(219,91,19,0.3)",
                borderColor: "#DB5B13",
                borderWidth: 1,
                color: "black",
                '&:hover': {
                    background: "rgba(219,91,19,0.3)",
                    borderColor: "#DB5B13",
                    borderWidth: 1.5,
                    boxShadow: 0,
                },
            }}
            {...props}
        /> :
        <LoadingButton
            variant={'outlined'}
            sx={{
                background: "rgba(219,91,19,0.3)",
                borderColor: "#DB5B13",
                borderWidth: 1,
                color: "black",
                boxShadow: 0,
                '&:hover': {
                    background: "rgba(219,91,19,0.3)",
                    borderColor: "#DB5B13",
                    borderWidth: 1.5,
                    boxShadow: 0,
                },
            }}
            {...props}
        />;
}