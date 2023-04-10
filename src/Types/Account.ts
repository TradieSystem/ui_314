/**
 * Two {@link User} types
 */
export enum UserType {
    CLIENT = 'Client',
    PROFESSIONAL = 'Professional'
}

/**
 * Two membership options for {@link ClientUserData} {@link User} type
 */
export enum MembershipOption {
    SUBSCRIPTION = 'Subscription',
    PAY_AS_YOU_GO = 'Single'
}

/**
 * Security Questions {@link User} can setup during the {@link SignUp} process, to use in the {@link ForgotPassword}
 */
export enum SecurityQuestion {
    CAR = 'What was your first car?',
    STREET = 'What was the name of the first street you lived on?',
    PET = 'What was the name of your first pet?',
    BORN = 'What city were you born in?',
    NICKNAME = 'What was your childhood nickname?'
}

export interface SecurityQuestionResponse {
    securityQuestion1: SecurityQuestionSet;
    securityQuestion2: SecurityQuestionSet;
    securityQuestion3: SecurityQuestionSet;
}

export interface SecurityQuestionSet {
    securityQuestion: SecurityQuestion;
    answer: string;
}