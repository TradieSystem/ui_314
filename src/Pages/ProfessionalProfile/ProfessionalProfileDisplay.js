import React from "react";
import ProfessionalProfile from "../ProfessionalProfile/ProfessionalProfile";
import {RootStyle} from "../../CommonStyles/SignUp_Login";
import PageContainer from "../../Components/PageContainer/PageContainer";




const ProfessionalProfileDisplay = () => {

    return (
        <PageContainer title={'Profile'}>
            <RootStyle style={{maxWidth: "900px",
                padding: 25,
                margin: "auto",
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                background: "#d8cecd",}}>
                <ProfessionalProfile />
                </RootStyle>

        </PageContainer>

    );
};

export default ProfessionalProfileDisplay;