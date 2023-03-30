import React from "react";
import {Container, Typography} from "@mui/material";
import ProfessionalProfile from "../ProfessionalProfile/ProfessionalProfile";
import {motion} from "framer-motion";
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import {easing} from '../../Effects/Animations';
import PageContainer from "../../Components/PageContainer/PageContainer";

const ProfessionalProfileDisplay = () => {

    return (
        <PageContainer title={''}>
        <RootStyle>
                    <ProfessionalProfile/>
        </RootStyle>
        </PageContainer>

    );
};

export default ProfessionalProfileDisplay;