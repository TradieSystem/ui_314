import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
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
import {Link as RouterLink} from "react-router-dom";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { animate } from "../../Effects/Animations";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {ThemedButton} from "../../Components/Button/ThemedButton";

const LoginForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const [showPassword, setShowPassword] = useState(false);

    const LoginSchema = Yup.object().shape({
        email: Yup.string()
            .email("Provide a valid email address")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            remember: true,
        },
        validationSchema: LoginSchema,
        onSubmit: () => {
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

                        <ThemedTextField
                            fullWidth
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            {...getFieldProps("password")}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
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
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        style={{ borderColor:"#DB5B13", color: "#DB5B13"}}
                                        {...getFieldProps("remember")}
                                        checked={values.remember}
                                        color={"warning"}
                                    />
                                }
                                label="Remember me"
                            />

                          <Link
                                component={RouterLink}
                                variant="subtitle2"
                                to="/ForgotPassword"
                                underline="hover"
                            >
                                Forgot password?
                            </Link>
                        </Stack>

                        <ThemedButton
                            loadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            loading={isSubmitting}
                        >
                            {isSubmitting ? <Loading /> : "Login"}
                        </ThemedButton>
                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;

function AuthContextState(arg0: boolean) { //Do we need this?
    throw new Error("Function not implemented.");
}
