import React from "react";
import ProfessionalProfile from "../ProfessionalProfile/ProfessionalProfile";
import PageContainer from "../../Components/PageContainer/PageContainer";
import { styled } from '@mui/material/styles';


const RootStyle = styled('div')({
    maxWidth: '1000px',
    padding: 25,
    margin: 'auto',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    background: '#f3d9ca',
    width: '100%',
    height: '100%',
    borderRadius: "25px"
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