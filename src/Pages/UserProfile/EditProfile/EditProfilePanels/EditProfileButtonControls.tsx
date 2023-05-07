import React from 'react';
import {ThemedButton} from "../../../../Components/Button/ThemedButton";
import {RoutesEnum} from "../../../../Routes";
import {EditUserFields} from "../EditProfileForm";
import {useFormikContext} from "formik";
import {useNavigate} from "react-router-dom";
import Loading from "../../../../Effects/loading";

export interface EditProfileButtonControlsProps {
    /**
     * Callback to handle submitting the {@link EditProfileForm}
     */
    handleSubmit: (fields: EditUserFields) => void;

    /**
     * Value to represent if the form is submitting
     */
    submitting: boolean;

    /**
     * Value to represent if the submit button should be disabled
     */
    disabled: boolean;
}

export const EditProfileButtonControls = ({handleSubmit, submitting, disabled}: EditProfileButtonControlsProps): JSX.Element => {
    const {values} = useFormikContext();
    const navigate = useNavigate();

    return (
        <div
            style={{
                display: "flex",
                marginLeft: "9rem",
                marginBottom: "3rem",
                gap: "3rem"
            }}
        >
            <ThemedButton
                onClick={() => navigate(`/${RoutesEnum.USER_MANAGEMENT}`)}
            >
                Cancel
            </ThemedButton>
            <ThemedButton
                loadingButton
                loading={submitting}
                onClick={() => {
                    const enteredFields = values as EditUserFields;
                    if (enteredFields) {
                        handleSubmit(enteredFields);
                    }
                }}
                disabled={disabled}
            >
                {submitting ? <Loading/> : "Save"}
            </ThemedButton>
        </div>
    )
}