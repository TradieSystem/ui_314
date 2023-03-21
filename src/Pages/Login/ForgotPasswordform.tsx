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


const ForgotPasswordForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const PasswordSchema = Yup.object().shape({
        email: Yup.string()
            .label('Email')
            .email("Provide a valid email address")
            .required("Email is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: " "

        },
        validationSchema: PasswordSchema,
        onSubmit: (values, actions) => {

            setTimeout(() => {
                navigate(from, { replace: true });
            }, 2000);
        },
    });

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } =
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
                            {...getFieldProps("email")}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
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
                            onClick={() => navigate("/Password")}
                        >
                            {isSubmitting ? <Loading /> : "Send Link"}
                        </ThemedButton>

                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default ForgotPasswordForm;