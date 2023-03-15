import React from "react";
import { Box } from "@mui/material";

const Logo = () => {
    return (
        <Box>
            <Box component="img" sx={{
                height: 233,
                width: 350,
            }} src="/img.png" alt="logo"/>
        </Box>
    );
}
export default Logo;