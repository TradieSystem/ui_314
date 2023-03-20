import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import {ThemedButton} from "../Button/ThemedButton";
import {ThemedTextField} from "../TextField/ThemedTextField";
import Loading from "./loading";
import {
    Box,
    Checkbox,
    FormControlLabel,
    IconButton,
    InputAdornment,
    Link,
    Stack
} from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

let easing = [0.6, -0.05, 0.01, 0.99];
const animate = {
    opacity: 1,
    y: 0,
    transition: {
        duration: 0.6,
        ease: easing,
        delay: 0.16,
    },
};


const PasswordForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [password, setPassword] = useState('');
    const [password1, setPassword1] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const PasswordSchema = Yup.object().shape({
        password: Yup.string()
            .required("Password is required")
            .min(3, 'Password must be at 3 char long'),
        password1: Yup.string()
            .label('Password1')
            .required("Password is required")
            .oneOf([Yup.ref('password')], "Passwords doesn't match"),
    });
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            password1: "",

        },
        validationSchema: PasswordSchema,
        onSubmit: (values, actions) => {
            const formOptions = { resolver: yupResolver(PasswordSchema) }

            setTimeout(() => {
                navigate(from, { replace: true });
            }, 2000);
        },
    });


    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
        formik;


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
                        initial={{ opacity: 0, y: 40 }}
                        animate={animate}
                    >
                        <ThemedTextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Email Address"
                        />
                        <ThemedTextField
                            fullWidth
                            autoComplete="new-password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            {...getFieldProps('password')}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            className={`form-control ${errors.password ? 'is-invalid' : ''}`}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <Icon icon="eva:eye-fill" />
                                            ) : (
                                                <Icon icon="eva:eye-off-fill" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <ThemedTextField
                            fullWidth
                            autoComplete="new-password"
                            type={showPassword1 ? "text" : "password"}
                            label="Password1"
                            {...getFieldProps('password1')}
                            error={Boolean(touched.password1 && errors.password1)}
                            helperText={touched.password1 && errors.password1}
                            className={`form-control ${errors.password1 ? 'is-invalid' : ''}`}

                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword1((prev) => !prev)}
                                        >
                                            {showPassword1 ? (
                                                <Icon icon="eva:eye-fill" />
                                            ) : (
                                                <Icon icon="eva:eye-off-fill" />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box
                        component={motion.div}
                        initial={{ opacity: 0, y: 20 }}
                        animate={animate}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ my: 2 }}
                        >
                        </Stack>

                        <ThemedButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loading={isSubmitting}
                        >
                            {isSubmitting ? <Loading /> : "Reset Password"}
                        </ThemedButton>

                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default PasswordForm;