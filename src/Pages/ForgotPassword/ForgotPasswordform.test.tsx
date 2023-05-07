import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import React from "react";
import ForgotPasswordform from "./ForgotPasswordform";
import {SecurityQuestion} from "../../Types/Account";
import userEvent from "@testing-library/user-event";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const TestComponent = () => {
    return (
        <MemoryRouter>
            <ForgotPasswordform/>
        </MemoryRouter>
    );
}

const securityQuestions = [
    {
        securityQuestion: SecurityQuestion.NICKNAME,
        answer: "answer 1"
    }
];

const questions = {questions: securityQuestions}

describe('<ForgotPasswordform>', () => {
    test('should render the <ForgotPasswordform> initially, with the correct structure', () => {
        //Only step one should be visible here
        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        expect(screen.getByRole('button', {
            name: /get security questions/i
        })).toBeInTheDocument();

        expect(screen.queryByText(/please answer the following security questions:/i)).not.toBeInTheDocument();
    });

    test('should render the next step when a valid email is entered and Get Security Questions is pressed', async () => {
        mockedAxios.get.mockResolvedValue({data: questions});

        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        const getSecurityQuestionButton = screen.getByRole('button', {
            name: /get security questions/i
        });
        expect(getSecurityQuestionButton).toBeInTheDocument();

        await userEvent.click(getSecurityQuestionButton);

        await waitFor(() => {
            expect(screen.getByText(/please answer the following security questions:/i)).toBeInTheDocument();
        });

        expect(screen.getByText(/what was your childhood nickname\?/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox', {
            name: /what was your childhood nickname\?/i
        })).toBeInTheDocument();
    });

    test('should return an error if the email entered was invalid', async () => {
        mockedAxios.get.mockResolvedValue({data: "something else"});

        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        const getSecurityQuestionButton = screen.getByRole('button', {
            name: /get security questions/i
        });
        expect(getSecurityQuestionButton).toBeInTheDocument();

        await userEvent.click(getSecurityQuestionButton);

        await waitFor(() => {
            expect(screen.getByText('Wrong Email')).toBeInTheDocument();
        });

        expect(screen.queryByText(/please answer the following security questions:/i)).not.toBeInTheDocument();
    });

    test('should render the third step if the security questions were correct', async () => {
        mockedAxios.get.mockResolvedValue({data: questions});
        mockedAxios.post.mockResolvedValue({data: {matched: true}});

        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        const getSecurityQuestionButton = screen.getByRole('button', {
            name: /get security questions/i
        });
        expect(getSecurityQuestionButton).toBeInTheDocument();

        await userEvent.click(getSecurityQuestionButton);
        await waitFor(() => {
            expect(screen.getByRole('textbox', {
                name: /what was your childhood nickname\?/i
            })).toBeInTheDocument();
        });

        //Type some answer in the field
        const textField = screen.getByRole('textbox', {
            name: /what was your childhood nickname\?/i
        });
        await userEvent.click(textField);
        await userEvent.type(textField, "test answer");

        await waitFor(() => {
            expect(screen.getByRole('button', {
                name: /submit form/i
            })).toBeVisible();
        });

        await userEvent.click(screen.getByRole('button', {
            name: /submit form/i
        }));

        await waitFor(() => {
            expect(screen.getByLabelText(/password/i)).toBeVisible();
        });

        expect(screen.getByRole('button', {
            name: /reset password/i
        })).toBeVisible();
    });

    test('should render an error and not show the reset password field if the security questions were incorrect', async () => {
        mockedAxios.get.mockResolvedValue({data: questions});
        mockedAxios.post.mockResolvedValue({data: {matched: false}});

        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        const getSecurityQuestionButton = screen.getByRole('button', {
            name: /get security questions/i
        });
        expect(getSecurityQuestionButton).toBeInTheDocument();

        await userEvent.click(getSecurityQuestionButton);
        await waitFor(() => {
            expect(screen.getByRole('textbox', {
                name: /what was your childhood nickname\?/i
            })).toBeInTheDocument();
        });

        //Type some answer in the field
        const textField = screen.getByRole('textbox', {
            name: /what was your childhood nickname\?/i
        });
        await userEvent.click(textField);
        await userEvent.type(textField, "test answer");

        await waitFor(() => {
            expect(screen.getByRole('button', {
                name: /submit form/i
            })).toBeVisible();
        });

        await userEvent.click(screen.getByRole('button', {
            name: /submit form/i
        }));

        await waitFor(() => {
            expect(screen.getByText("Wrong Security Questions")).toBeInTheDocument();
        });

        expect(screen.queryByRole('button', {
            name: /reset password/i
        })).not.toBeInTheDocument();
        expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();

    });

    test('should show a confirmation if the password could be reset successfully', async () => {
        mockedAxios.get.mockResolvedValue({data: questions});
        mockedAxios.post.mockResolvedValue({data: {matched: true}});
        mockedAxios.put.mockResolvedValue({data: "any data passes"})

        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        const getSecurityQuestionButton = screen.getByRole('button', {
            name: /get security questions/i
        });
        expect(getSecurityQuestionButton).toBeInTheDocument();

        await userEvent.click(getSecurityQuestionButton);
        await waitFor(() => {
            expect(screen.getByRole('textbox', {
                name: /what was your childhood nickname\?/i
            })).toBeInTheDocument();
        });

        //Type some answer in the field
        const textField = screen.getByRole('textbox', {
            name: /what was your childhood nickname\?/i
        });
        await userEvent.click(textField);
        await userEvent.type(textField, "test answer");

        await waitFor(() => {
            expect(screen.getByRole('button', {
                name: /submit form/i
            })).toBeVisible();
        });

        await userEvent.click(screen.getByRole('button', {
            name: /submit form/i
        }));

        await waitFor(() => {
            expect(screen.getByLabelText(/password/i)).toBeVisible();
        });

        expect(screen.getByRole('button', {
            name: /reset password/i
        })).toBeVisible();

        const resetPasswordTextField = screen.getByTestId("password-reset");

        await userEvent.click(resetPasswordTextField);
        await userEvent.type(resetPasswordTextField, "new password");

        await userEvent.click(screen.getByRole('button', {
            name: /reset password/i
        }));

        await waitFor(() => {
            expect(screen.getByText("Good job!")).toBeInTheDocument();
        });

        expect(screen.queryByText("Error")).not.toBeInTheDocument();
    });

    test('should show an error if the password could NOT be reset successfully', async () => {
        mockedAxios.get.mockResolvedValue({data: questions});
        mockedAxios.post.mockResolvedValue({data: {matched: true}});
        mockedAxios.put.mockResolvedValue(undefined)

        render(TestComponent());

        expect(screen.getByRole('textbox', {
            name: /email address/i
        })).toBeInTheDocument();

        const getSecurityQuestionButton = screen.getByRole('button', {
            name: /get security questions/i
        });
        expect(getSecurityQuestionButton).toBeInTheDocument();

        await userEvent.click(getSecurityQuestionButton);
        await waitFor(() => {
            expect(screen.getByRole('textbox', {
                name: /what was your childhood nickname\?/i
            })).toBeInTheDocument();
        });

        //Type some answer in the field
        const textField = screen.getByRole('textbox', {
            name: /what was your childhood nickname\?/i
        });
        await userEvent.click(textField);
        await userEvent.type(textField, "test answer");

        await waitFor(() => {
            expect(screen.getByRole('button', {
                name: /submit form/i
            })).toBeVisible();
        });

        await userEvent.click(screen.getByRole('button', {
            name: /submit form/i
        }));

        await waitFor(() => {
            expect(screen.getByLabelText(/password/i)).toBeVisible();
        });

        expect(screen.getByRole('button', {
            name: /reset password/i
        })).toBeVisible();

        const resetPasswordTextField = screen.getByTestId("password-reset");

        await userEvent.click(resetPasswordTextField);
        await userEvent.type(resetPasswordTextField, "new password");

        await userEvent.click(screen.getByRole('button', {
            name: /reset password/i
        }));

        await waitFor(() => {
            expect(screen.getByText("Error")).toBeInTheDocument();
        });

        expect(screen.queryByText("Good job!")).not.toBeInTheDocument();
    });
});