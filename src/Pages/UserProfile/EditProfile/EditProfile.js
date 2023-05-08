import React from "react";
import EditProfileForm from "./EditProfileForm";
import {PageContainer} from '../../../Components/PageContainer/PageContainer';
import { styled } from '@mui/material/styles';


const EditProfile = () => {

    return (
        <PageContainer title={'Edit User'}>
            <EditProfileForm/>
        </PageContainer>
    );
};

export default EditProfile;