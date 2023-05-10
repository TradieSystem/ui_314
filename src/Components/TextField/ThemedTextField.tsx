import React from 'react';
import {TextField, TextFieldProps} from "@mui/material";

export const ThemedTextField = ({helperText, children, ...props}: TextFieldProps) => {
    return (
        <TextField
            variant={'outlined'}
            sx={{
                background: "#ffffff",
                borderColor: "#dc7336",
                fontFamily:'Fahrenheit',
                '& label.Mui-focused': {
                    color: '#dc7336',
                    fontFamily:'Fahrenheit',
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#dc7336'
                },
                '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                        borderColor: '#dc7336',
                    },
                    '&:hover fieldset': {
                        borderColor: '#dc7336',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: '#dc7336',
                    },
                },
            }}
            helperText={helperText}
            {...props}
        >
            {children}
        </TextField>
    )
}

export default ThemedTextField;