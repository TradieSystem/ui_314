import React, { useState } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {Field, Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import Loading from "../../Effects/loading"
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    IconButton,
    InputAdornment,
    Link,
    Radio,
    RadioGroup,
    Stack
} from "@mui/material";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { useRadioGroup } from '@mui/material/RadioGroup';
import {ThemedButton} from "../../Components/Button/ThemedButton";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import PageContainer from "../../Components/PageContainer/PageContainer";
import { pink } from "@mui/material/colors";


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



const ClientRequestForm = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const ClientFormSchema = Yup.object().shape({
        Description:Yup.string().required("Description is required")
    });

    const formik = useFormik({
        initialValues: {
            Description: " ",


        },
        validationSchema: ClientFormSchema,
        onSubmit: (values, actions) => {

            setTimeout(() => {
                navigate(from, { replace: true });
            }, 2000);
        },
    });

    const { errors, touched, values, handleSubmit,isSubmitting, getFieldProps } =
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

                        <FormControl>
                            <p style={{fontSize:"20px"}}>Pick a Job:</p>
                    <RadioGroup

                        aria-labelledby="Checkbutton"
                        defaultValue="Tree Removal"
                        name="CheckButton"

                    >
                        <FormControlLabel value="Tree Removal" control={<Radio color={"warning"} />}  label="Tree Removal"  />
                        <FormControlLabel value="Roof Cleaning" control={<Radio color={"warning"} />}  label="Roof Cleaning" />
                        <FormControlLabel value="Fence Installation" control={<Radio color={"warning"} />}  label="Fence Installation" />
                        <FormControlLabel value="Oven Repairs" control={<Radio color={"warning"}/>} label="Oven Repairs" />
                        <FormControlLabel value="Plumbing" control={<Radio color={"warning"}/>}  label="Plumbing" />
                    </RadioGroup>
                        </FormControl>

                    <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ my: 2 }}
                    >
                    </Stack>

                        <ThemedTextField
                            multiline
                            rows={15}
                            style={{height:"375px"}}
                            autoComplete="Description"
                            type="text"
                            label="Description Of Job"
                            {...getFieldProps("Description")}
                            error={Boolean(touched.Description && errors.Description)}
                            helperText={touched.Description && errors.Description}
                        />
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                            sx={{ my: 2 }}
                        >
                        </Stack>
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
                        <ThemedButton
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            loadingButton={isSubmitting}
                        >
                            {isSubmitting ? <Loading /> : "Send Request Form"}
                        </ThemedButton>
                            </Box>
                    </Box>
                </Box>
            </Form>
        </FormikProvider>
    );
};

export default ClientRequestForm;