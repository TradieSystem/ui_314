import styled from "@emotion/styled";
import {Box} from "@mui/material";

export const RootStyle = styled("div")({
    background:"#f6e3d7",
    fontFamily:'Fahrenheit',
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

export const HeadingStyle = styled(Box)({
    textAlign: "center",
    fontFamily:'Fahrenheit'
});

export const ContentStyle = styled("div")({
    maxWidth: 600,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    "& .MuiTypography-root" :{
        fontFamily:'Fahrenheit'
    },
    "& .MuiAlert-message":{
        
        fontFamily:'Fahrenheit'
    }
});
export const Style = styled("div")({
    "& .MuiAlert-message":{

        fontFamily:'Fahrenheit',
    },
    "& .MuiTypography-root":{
        fontFamily:'Fahrenheit'
    },
    "& .MuiPaper-root-MuiAlert-root":{

        fontFamily:'Fahrenheit'
    }
});