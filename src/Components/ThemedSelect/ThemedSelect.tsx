import React from 'react';
import {Select, SelectProps} from "@mui/material";

export const ThemedSelect = ({children, ...props}: SelectProps) => {
    return (
        <Select
            variant={'outlined'}
            sx={{
                background: "#ffffff",
                border: "2px solid #dc7336",
                fontFamily:'Fahrenheit',
            }}
            {...props}
        >
            {children}
        </Select>
    )
}

export default ThemedSelect;