import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {Box, Grid, IconButton, InputAdornment} from "@mui/material";
import {motion} from "framer-motion";
import {Icon} from "@iconify/react";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {DEV_PATH, RoutesEnum} from "../../Routes";
import axios from "axios";
import swal from 'sweetalert';
import {SecurityQuestionSet} from "../../Types/Account"

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
    const [email, setEmail] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestionSet[]>([]);
    const [isSecurityQuestionsValid, setIsSecurityQuestionsValid] = useState(false);
    const [userId, SetUser] = useState<number>();
    const [password, setPassword] = useState('');
    const md5Hash = require("md5-hash");
    const [showPassword, setShowPassword] = useState(false);

    const handlePasswordChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setPassword(event.target.value);
    }
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const {value} = event.target;
        setSecurityQuestions((prevQuestions) =>
            prevQuestions.map((question, i) => (i === index ? {...question, answer: value} : question))
        );
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const data = securityQuestions.map((question) => ({
        securityQuestion: question.securityQuestion,
        answer: question.answer,
    }));
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const userAnswers = securityQuestions
            .map((question) => ({securityQuestion: question.securityQuestion, answer: question.answer}))
            .filter((answer) => answer.answer !== null) as { securityQuestion: string, answer: string }[];

    }

    const PasswordReset = () => {

        const UserObject = {
            user_id: userId,
            password: md5Hash.default(password)
        };
        axios
            .put(`${DEV_PATH}/user/resetPassword`, UserObject, {
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((response) => {
                if (response.data) {
                    swal("Good job!", "You Have Changed Your Password!", "success");
                    navigate("/" + RoutesEnum.LOGIN);
                } else {
                    swal("Error", "Try Again", "error");
                }
            })
            .catch((error) => {
                swal("Error", "Try Again", "error");
            });
    }
    const handleQuestions = () => {

        const requestData = {
            user_id: userId,
            questions: data,
        };
        axios
            .post(`${DEV_PATH}/user/resetPassword`, requestData, {
                headers: {
                    "content-type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
            })
            .then((response) => {
                if (response.data.matched === true) {
                    setIsSecurityQuestionsValid(true);
                } else {
                    swal("Wrong Security Questions", "Try Again", "error");
                }
            })
            .catch((error) => {
                swal("Wrong Security Questions", "Try Again", "error");
            });
    }

    const handleGetQuestions = () => {
        axios
            .get(`${DEV_PATH}/user/resetPassword?email=${email}`, {
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                if (response.data && response.data.questions && response.data.questions.length > 0) {
                    const questions: SecurityQuestionSet[] = response.data.questions;
                    if (questions) {
                        setSecurityQuestions(questions);
                        SetUser(response.data.user_id);

                    } else {
                        swal("Wrong Email", "Try Another Email", "error");
                    }
                } else {
                    swal("Wrong Email", "Try Another Email", "error");
                }
            })
            .catch((error) => {
                swal("Wrong Email", "Try Another Email", "error");
            });
    };

    return (
        <form onSubmit={handleSubmit}>
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
                    <Box style={{justifyContent: "center", display: "flex"}}>
                        <ThemedTextField
                            fullWidth
                            type="email"
                            id="email"
                            label="Email Address"
                            value={email}
                            onChange={handleEmailChange}
                        >
                        </ThemedTextField>
                    </Box>
                    <Box style={{justifyContent: "center", display: "flex"}}>
                        <ThemedButton type="button" onClick={handleGetQuestions}>
                            Get Security Questions
                        </ThemedButton>
                    </Box>
                    {securityQuestions.length > 0 && (
                        <>
                            <Box
                                sx={{
                                    background: "#d9c8c6",
                                    borderRadius: 5,
                                    border: "2px solid #DB5B13",
                                    padding: 2
                                }}>
                                <p style={{justifyContent: "center", display: "flex"}}>
                                    Please answer the following security questions:
                                </p>
                                {securityQuestions.map((question, index) => (
                                    <div key={question.securityQuestion}>
                                        <Grid container spacing={1}>
                                            <Grid item xs={6}>
                                                <label htmlFor={`answer-${index}`}>{question.securityQuestion}</label>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <input
                                                    style={{
                                                        background: "#dcdcdc",
                                                        borderColor: "#dc7336",
                                                        borderRadius: 5,
                                                        border: "2px solid #DB5B13",
                                                        padding: 11,
                                                        outline: "none",
                                                        marginBottom: "10px"
                                                    }}
                                                    type="text"
                                                    id={`answer-${index}`}
                                                    value={question.answer ?? ''}
                                                    onChange={(event) => handleInputChange(event, index)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </div>
                                ))}
                            </Box>
                            <ThemedButton type="button" onClick={handleQuestions}>Submit Form</ThemedButton>
                        </>
                    )}
                    {isSecurityQuestionsValid ? (
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
                                <Box style={{justifyContent: "center", display: "flex"}}>
                                    <ThemedTextField
                                        fullWidth
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        data-testid={"password-reset"}
                                        value={password}
                                        label="Password"
                                        onChange={handlePasswordChange}
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
                                <Box style={{justifyContent: "center", display: "flex"}}>
                                    <ThemedButton type="button" onClick={PasswordReset}>
                                        Reset Password
                                    </ThemedButton>
                                </Box>
                            </Box>
                        </Box>
                    ) : null}
                </Box>
            </Box>
        </form>
    );
};


export default ForgotPasswordForm;
