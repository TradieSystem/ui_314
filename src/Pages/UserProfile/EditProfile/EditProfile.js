import React from "react";
import EditProfileForm from "./EditProfileForm";
import {PageContainer} from '../../../Components/PageContainer/PageContainer';


const EditProfile = () => {

    return (
        <PageContainer title={'Edit User'}>
            <EditProfileForm/>
        </PageContainer>
    );
};

export default EditProfile;