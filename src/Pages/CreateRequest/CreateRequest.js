import React from "react";
import {Container} from "@mui/material";
import {motion} from "framer-motion";
import CreateRequestForm from "./CreateRequestForm"
import {fadeInUp} from '../../Effects/Animations';
import {ContentStyle, HeadingStyle, RootStyle} from "../../CommonStyles/SignUp_Login";
import {PageContainer} from '../../Components/PageContainer/PageContainer'

const CreateRequest = () => {
    return (
        <PageContainer title={''}>
            <RootStyle>
                <Container maxWidth="sm">
                    <ContentStyle>
                        <HeadingStyle component={motion.div} {...fadeInUp}>
                            <h1>Request Form</h1>
                        </HeadingStyle>
                        <CreateRequestForm/>
                    </ContentStyle>
                </Container>
            </RootStyle>
        </PageContainer>
    );
};

export default CreateRequest;