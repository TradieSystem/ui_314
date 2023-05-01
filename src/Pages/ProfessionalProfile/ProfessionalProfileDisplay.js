import React from "react";
import ProfessionalProfile from "../ProfessionalProfile/ProfessionalProfile";
import PageContainer from "../../Components/PageContainer/PageContainer";
import { styled } from '@mui/material/styles';


const RootStyle = styled('div')({
    maxWidth: '1500px',
    padding: 25,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#d8cecd',
    width: '100%', // auto size width
    height: '100%', // auto size height
});


const ProfessionalProfileDisplay = () => {

    return (
        <PageContainer title={'Profile'}>
            <RootStyle>
                <ProfessionalProfile />
            </RootStyle>

        </PageContainer>

    );
};

export default ProfessionalProfileDisplay;