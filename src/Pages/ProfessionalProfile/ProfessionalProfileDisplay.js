import React from "react";
import ProfessionalProfile from "../ProfessionalProfile/ProfessionalProfile";
import {RootStyle} from "../../CommonStyles/SignUp_Login";
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