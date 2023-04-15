import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Form, FormikProvider, useFormik} from "formik";
import {Box, Stack} from "@mui/material";
import {motion} from "framer-motion";
import {ThemedButton} from "../../Components/Button/ThemedButton";
import ThemedTextField from "../../Components/TextField/ThemedTextField";
import {User} from "../../Types/User";
import {DEV_PATH, RoutesEnum} from "../../Routes";
import axios from "axios";
import swal from 'sweetalert';


import { render } from "react-dom";
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

type SecurityQuestion = {
    securityQuestion: string;
    answer: string | null;
};

const ForgotPasswordForm = () => {

    const user: User = JSON.parse(localStorage.getItem("user") || "{}") as User;
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState('');
    const [securityQuestions, setSecurityQuestions] = useState<SecurityQuestion[]>([]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = event.target;
        setSecurityQuestions((prevQuestions) =>
            prevQuestions.map((question, i) => (i === index ? { ...question, answer: value } : question))
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
        const userAnswers = securityQuestions
            .map((question) => ({securityQuestion: question.securityQuestion, answer: question.answer}))
            .filter((answer) => answer.answer !== null) as { securityQuestion: string, answer: string }[];

    }
    const handleQuestions= () => {
        const requestData = {
            questions: data
        };
        axios
            .post(`${DEV_PATH}/user/resetPassword`,requestData,{
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
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
                    const questions: SecurityQuestion[] = response.data.questions;
                    if (questions) {
                        setSecurityQuestions(questions);
                        console.log(questions); // log the value of the securityQuestions state
                    } else {
                        console.log('Error: No security question found');
                    }
                } else {
                    console.log('Error: No questions found in response');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" value={email} onChange={handleEmailChange} />
                <button type="button" onClick={handleGetQuestions}>
                    Get Security Questions
                </button>
            </div>
            {securityQuestions.length > 0 && (
                <>
                    <p>Please answer the following security questions:</p>
                    {securityQuestions.map((question, index) => (
                        <div key={question.securityQuestion}>
                            <label htmlFor={`answer-${index}`}>{question.securityQuestion}</label>
                            <input
                                type="text"
                                id={`answer-${index}`}
                                value={question.answer ?? ''}
                                onChange={(event) => handleInputChange(event, index)}
                            />
                        </div>
                    ))}
                    <button type="submit">Submit Answers</button>
                    <button type="button" onClick={handleQuestions}>Submit Form</button>
                </>
            )}
        </form>
    );
};


export default ForgotPasswordForm;
