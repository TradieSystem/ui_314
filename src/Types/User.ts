import {MembershipOption, SecurityQuestionResponse, SecurityQuestionSet, UserType} from "./Account";
import {ServiceType} from "./ServiceType";
import {CCDetails} from "./Payment";

/**
 * Interface to describe the attributes of User
 */
export interface User {
    user_id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    mobile: string;
    address: Address;
    /**
     * Client vs. Professional
     */
    userType?: UserType; //This isn't sent from the backend - we set this on frontend upon logging in
    /**
     * (Optional) The {@link ClientUserData} to describe properties of a client {@link User} -- sent from backend
     */
    client?: ClientUserData;
    /**
     * (Optional) The {@link ProfessionalUserData} to describe properties of a professional {@link User} -- sent from backend
     */
    professional?: ProfessionalUserData;
    /**
     * (Optional) CC details for system to charge the {@link User} -- set to optional as we don't receive this from backend on logging in
     */
    CCOut?: CCDetails;
    /**
     * (Optional) Security questions the {@link User} sets on {@link SignUp} -- set to optional as we don't receive this from backend on logging in
     */
    securityQuestions?: SecurityQuestionResponse;
}

export interface ClientUserData {
    membershipType: MembershipOption;
}

export interface ProfessionalUserData {
    services: ServiceType[];
    CCIn: CCDetails;
}

export interface Address {
    //To facilitate 50a, 50/58 etc, string is used for street number
    streetNumber: string;
    streetName: string;
    suburb: string;
    postcode: string;
}