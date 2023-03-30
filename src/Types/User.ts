import {UserType} from "./Account";

/**
 * Interface to describe the attributes of User
 */
export interface User {
    userId: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    address: Address;
    mobile: string;
    usertype: UserType;
}

export interface Address {
    //To facilitate 50a, 50/58 etc, string is used for street number
    streetNumber: string;
    streetName: string;
    suburb: string;
    postcode: string;
}