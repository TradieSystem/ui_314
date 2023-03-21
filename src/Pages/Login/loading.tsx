import React from "react";
import { Box } from "@mui/material";
import "./rotating.css"

const Loading = () => {

    return (
        <Box>
            <Box className="image" component="img" sx={{
                height: 50,
                width: 50,
            }} src="/pie.png" alt="logo"/>
        </Box>
    );
}
export default Loading;