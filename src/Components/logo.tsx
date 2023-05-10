import React from "react";
import {Box} from "@mui/material";

const Logo = () => {
    return (
        <Box>
            <Box
                component="img" sx={{
                height: 300,
                width: 350,
            }}
                src="/tradie (2).png" alt="logo"
            />
        </Box>
    );
}
export default Logo;