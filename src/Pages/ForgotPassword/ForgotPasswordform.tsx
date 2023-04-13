import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, FormikProvider, useFormik} from "formik";
import * as Yup from "yup";
import {Box, Stack} from "@mui/material";
import {motion} from "framer-motion";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {RoutesEnum} from "../../Routes";
import {User} from "../../Types/User";

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
const questions = [
    "What is your mother's maiden name?",
    "What is your favorite color?",
    "What was the name of your first pet?",
];


const ForgotPasswordForm = () => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
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
                navigate(from, {replace: true});
            }, 2000);
        },
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
                            error={Boolean(touched.email && errors.email)}
                            helperText={touched.email && errors.email}
                        />
                        if(user.email === email){

                    }
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
                        </Stack>

                        <ThemedButton
                            loadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            onClick={() => navigate(`/${RoutesEnum.PASSWORD}`)}
                        >
                        </ThemedButton>
                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default ForgotPasswordForm;


