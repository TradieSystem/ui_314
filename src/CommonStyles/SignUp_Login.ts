import styled from "@emotion/styled";
import {Box} from "@mui/material";

export const RootStyle = styled("div")({
    background: "#D8CECD",
    height: "100vh",
    display: "grid",
    placeItems: "center",
});

export const HeadingStyle = styled(Box)({
    textAlign: "center",
});

export const ContentStyle = styled("div")({
    maxWidth: 600,
    padding: 25,
    margin: "auto",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
});