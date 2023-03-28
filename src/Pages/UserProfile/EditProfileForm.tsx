import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import Loading from "../../Effects/loading";
import {Box, Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select,
    SelectChangeEvent, Stack, Theme, useTheme} from "@mui/material";
import {Icon} from "@iconify/react";
import {motion} from "framer-motion";
import {yupResolver} from '@hookform/resolvers/yup';
import {ThemedButton} from "../../Components/Button/ThemedButton";
import {animate} from "../../Effects/Animations";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {useAuthContext} from "../../Contexts/AuthContext";
import { LoadingButton } from "@mui/lab";



const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const memberships = [
   'CLIENT',
   'PROFESSIONAL'
];
function getStyles(membership: string, membershipType: string[], theme: Theme) {
    return {
        fontWeight:
            membershipType.indexOf(membership) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const EditProfileForm = () => {
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [errorMessage, setErrorMessage] = useState('');
    const theme = useTheme();
    const [membershipType, setmembershipType] = React.useState<string[]>([]);

    const handleChange = (event: SelectChangeEvent<typeof membershipType>) => {
        const {
            target: { value },
        } = event;
        setmembershipType(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split('') : value,
        );
    };
    const PasswordSchema = Yup.object().shape({

    });
    // @ts-ignore
   //{ useEffect(() => {
       // const url = baseUrl + 'api/Users/';
      //  fetch(url)
       // .then((response) =>{
       // if((response.status === 404))
        //    {
        //        setNotFound(true)
         //   }
        //    return response.json();
       // })
   // .then((data) => {
     //   setUser(data.customer)
     //   setTempUser(data.customer)
   // })
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            password1: "",

        },
        validationSchema: PasswordSchema,
        onSubmit: (values, actions) => {


            setTimeout(() => {
                navigate(from, {replace: true});
            }, 2000);
        },
    });



    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} =
        formik;

if(user) {
    return (
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>

                <Box
                    component={motion.div}
                    animate={{
                        transition: {
                            staggerChildren: 0.55,
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 3,
                        }}
                        component={motion.div}
                        initial={{opacity: 0, y: 40}}
                        animate={animate}
                    >
                        <ThemedTextField
                            fullWidth
                            autoComplete="firstname"
                            value={user.firstname}
                            type="text"
                        />
                        <ThemedTextField
                            type="text"
                            value={user.lastname}
                        />
                        <ThemedTextField
                            type="text"
                            value={user.mobile}
                            label="Mobile"
                        />
                        <ThemedTextField
                            value={user.address.streetNumber && user.address.streetName}
                            type="text"
                            label="Address"
                        />
                        <ThemedTextField
                            value={user.address.suburb}
                            type="text"
                            label="State/Region"
                        />
                        <ThemedTextField
                            value={user.address.postcode}
                            type="text"
                            label="postcode"
                        />
                        <ThemedTextField
                            value="*****************"
                            type="text"
                            label="Credit Card"
                        />
                        <ThemedTextField
                            value="***"
                            type="text"
                            label="CVV"
                        />
                        <FormControl sx={{
                            background: "#dcdcdc",
                            borderColor: "#dc7336",
                            '& label.Mui-focused': {
                                color: '#dc7336',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#dc7336'
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#dc7336',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#dc7336',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#dc7336',
                                },
                            },
                        }}>
                            <InputLabel id="MembershipType">Account Type</InputLabel>
                            <Select
                                labelId={user.usertype}
                                id="MembershipType"
                                multiple
                                value={membershipType}
                                onChange={handleChange}
                                input={<OutlinedInput label="Membership Type"/>}
                                MenuProps={MenuProps}
                            >
                                {memberships.map((membership) => (
                                    <MenuItem
                                        key={membership}
                                        value={membership}
                                        style={getStyles(membership, membershipType, theme)}
                                    >
                                        {membership}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                            <Box
                                component={motion.div}
                                initial={{opacity: 0, y: 20}}
                                animate={animate}
                                marginTop={3}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}
                            >
                                <Button
                                    sx={{
                                        background: "rgba(219,91,19,0.3)",
                                        borderColor: "#DB5B13",
                                        borderWidth: 1,
                                        color:"black",
                                        '&:hover': {
                                            background: "rgba(219,91,19,0.3)",
                                            borderColor: "#DB5B13",
                                            borderWidth: 1.5,
                                            boxShadow: 0,
                                        },
                                    }}
                                    type="button"
                                    variant="contained"
                                    onClick={() => navigate("/USER_MANAGEMENT")}
                                >
                                    {"Go Back"}
                                </Button>

                            <LoadingButton
                                sx={{
                                    background: "rgba(219,91,19,0.3)",
                                    borderColor: "#DB5B13",
                                    borderWidth: 1,
                                    color:"black",
                                    '&:hover': {
                                        background: "rgba(219,91,19,0.3)",
                                        borderColor: "#DB5B13",
                                        borderWidth: 1.5,
                                        boxShadow: 0,
                                    },
                                }}
                                type="submit"
                                variant="contained"
                                loading={isSubmitting}
                                onClick={() => navigate("/USER_MANAGEMENT")}
                            >
                                {isSubmitting  ? <Loading /> : "Save"}



                            </LoadingButton>
                            </Box>
                        </Box>
                    </Box>
            </Form>
        </FormikProvider>
    );
}
};

export default EditProfileForm;