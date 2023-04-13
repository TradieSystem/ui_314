import React, {useState} from "react";
import {Link as RouterLink, useLocation, useNavigate} from "react-router-dom";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import Loading from "../../Effects/loading";
import {Box, Checkbox, FormControlLabel, IconButton, InputAdornment, Link, Stack} from "@mui/material";
import {Icon} from "@iconify/react";
import {motion} from "framer-motion";
import {animate} from "../../Effects/Animations";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import {CORS_HEADER, DEV_PATH, RoutesEnum} from "../../Routes";
import axios from "axios";
import swal from 'sweetalert';
import "./Swal.css";
import {UserType} from "../../Types/Account";


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
        onSubmit: ({email, password}) => {
            axios.post((`${DEV_PATH}/user/login?email=${email}&password=${password}`), {
                headers: CORS_HEADER,
            })
                .then((response) => {
                    let userObject = response.data.user;
                    if (response.data.user.professional === null && response.data.user.client !== null) {
                        userObject.userType = UserType.CLIENT
                    }
                    if (response.data.user.client === null && response.data.user.professional !== null) {
                        userObject.userType = UserType.PROFESSIONAL
                    }
                    if (response.data.user.client !== null && response.data.user.professional !== null) {
                        userObject.userType = UserType.PROFESSIONAL
                    }
                    if (response.data.user) {
                        try {
                            localStorage.setItem("user", JSON.stringify(userObject));
                            localStorage.setItem("access_token", response.data.access_token);
                            localStorage.setItem("refresh_token", response.data.refresh_token);
                            swal("Good job!", "You Have Signed In!", "success");
                            navigate("/" + RoutesEnum.HOME)

                        } catch (error) {
                            //This error will appear if we receive a 200, with an object that isn't a user
                            swal("Wrong Credentials", "Cant Sign in wrong email/password!", "error")
                        }
                    } else {
                        throw new Error();
                    }
                })
                .catch(() => {
                    swal("Wrong Credentials", "Cant Sign in wrong email/password!", "error").then(function () {
                        window.location.reload();
                    });
                });
        }
    });


    const {errors, touched, values, isSubmitting, handleSubmit, getFieldProps} =
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
                        initial={{opacity: 0, y: 40}}
                        animate={animate}
                    >
                        <ThemedTextField
                            fullWidth
                            autoComplete="username"
                            type="email"
                            label="Email Address"
                            {...getFieldProps("email")}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />

                        <ThemedTextField
                            fullWidth
                            autoComplete="current-password"
                            type={showPassword ? "text" : "password"}
                            label="Password"
                            {...getFieldProps("password")}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={Boolean(touched.password && errors.password)}
                            helperText={touched.password && errors.password}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword((prev) => !prev)}
                                        >
                                            {showPassword ? (
                                                <Icon icon="eva:eye-fill"/>
                                            ) : (
                                                <Icon icon="eva:eye-off-fill"/>
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Box>

                    <Box
                        component={motion.div}
                        initial={{opacity: 0, y: 20}}
                        animate={animate}
                    >
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{my: 2}}
                        >
                            <FormControlLabel
                                style={{color: "black"}}
                                control={
                                    <Checkbox
                                        inputProps={{'aria-label': 'controlled'}}
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
                                to={`/${RoutesEnum.PASSWORD}`}
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
                            {isSubmitting ? <Loading/> : "Login"}
                        </ThemedButton>
                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default LoginForm;

