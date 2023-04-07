import React from 'react';
import {User} from "../Types/User";
import {MembershipOption, UserType} from "../Types/Account";
import {ServiceRequest, ServiceRequestStatus} from "../Types/ServiceRequest";
import {ServiceType} from "../Types/ServiceType";
import {dummyProfessionalUser} from "../Contexts/AuthContext";

/**
 * Function to generate a list of dummy data containing a list of clients
 */
export function generateClients() : User[] {
    let clients : User[] = [];

    //Starting from 3 as ids 1 and 2 are in the AuthContext
    for(let i=3; i<51; i++) {
        const newClient : User = {
            userId: i,
            firstName: `Firstname ${i}`,
            lastName: `Lastname ${i}`,
            email: `${i}@gmail.com`,
            password: "123",
            address: {
                streetNumber: i.toString(),
                streetName: "Demo Street",
                suburb: "Demo Suburb",
                postcode: `12${i}`
            },
            mobile: `12345678${i}`,
            userType: UserType.CLIENT,
            client: {
                membershipType: (i%2 === 0) ? MembershipOption.SUBSCRIPTION : MembershipOption.PAY_AS_YOU_GO
            }
        }

        clients.push(newClient);
    }

    return clients;
}

/**
 * Function to generate a list of dummy service requests made by the same client
 */
const dummyServiceRequests : ServiceRequest[] = [
    {
        applicationNumber: 2,
        applicationDate: new Date("01/02/2022"),
        serviceType: ServiceType.FENCE_INSTALLATION,
        status: ServiceRequestStatus.COMPLETE,
        cost: 101.55,
        suburb: "Sydney",
        client: generateClients().at(0) as User,
        postcode: "2000",
        description: "I want a new fence please"
    },
    {
        applicationNumber: 1,
        applicationDate: new Date("01/01/2021"),
        serviceType: ServiceType.PLUMBING,
        status: ServiceRequestStatus.ARCHIVED,
        postcode: "2111",
        client: generateClients().at(0) as User,
        suburb: "Liverpool",
        cost: 250.95
    },
    {
        applicationNumber: 3,
        applicationDate: new Date("03/03/2023"),
        serviceType: ServiceType.OVEN_REPAIRS,
        status: ServiceRequestStatus.PENDING_COMPLETION,
        postcode: "2222",
        client: generateClients().at(0) as User,
        suburb: "Moorebank",
        cost: 143.15
    },
    {
        applicationNumber: 4,
        applicationDate: new Date("03/15/2023"),
        serviceType: ServiceType.ROOF_CLEANING,
        status: ServiceRequestStatus.PENDING_ACCEPTANCE,
        client: generateClients().at(0) as User,
        postcode: "2333",
        suburb: "Liverpool",
        cost: 32.50
    },
    {
        applicationNumber: 5,
        applicationDate: new Date("03/07/2023"),
        serviceType: ServiceType.TREE_REMOVAL,
        status: ServiceRequestStatus.NEW,
        postcode: "2444",
        client: generateClients().at(0) as User,
        suburb: "Sydney",
        cost: 0,
        description: 'The tree is in the way'
    },
    {
        applicationNumber: 6,
        applicationDate: new Date("03/10/2023"),
        serviceType: ServiceType.PLUMBING,
        status: ServiceRequestStatus.NEW,
        client: generateClients().at(0) as User,
        applicantIds: [dummyProfessionalUser.userId],       //Pretending this has already had 1 applicant - this dummyProfessionalUser
        postcode: "2555",
        suburb: "Moorebank",
        cost: 0
    },
    {
        applicationNumber: 7,
        applicationDate: new Date("03/11/2022"),
        serviceType: ServiceType.FENCE_INSTALLATION,
        status: ServiceRequestStatus.ARCHIVED,
        client: generateClients().at(0) as User,
        postcode: "2666",
        suburb: "Wollongong",
        cost: 22.24
    },
    {
        applicationNumber: 10,
        applicationDate: new Date("03/07/2023"),
        serviceType: ServiceType.TREE_REMOVAL,
        status: ServiceRequestStatus.COMPLETE,
        client: generateClients().at(0) as User,
        postcode: "2777",
        suburb: "Liverpool",
        cost: 101.23
    },
    {
        applicationNumber: 8,
        applicationDate: new Date("03/12/2023"),
        serviceType: ServiceType.OVEN_REPAIRS,
        status: ServiceRequestStatus.PENDING_COMPLETION,
        client: generateClients().at(0) as User,
        postcode: "2888",
        suburb: "Wollongong",
        cost: 114.34
    },
    {
        applicationNumber: 9,
        applicationDate: new Date("03/15/2023"),
        serviceType: ServiceType.ROOF_CLEANING,
        status: ServiceRequestStatus.PENDING_ACCEPTANCE,
        client: generateClients().at(0) as User,
        postcode: "2999",
        suburb: "Liverpool",
        cost: 87.23
    },
    {
        applicationNumber: 11,
        applicationDate: new Date("12/15/2020"),
        serviceType: ServiceType.OVEN_REPAIRS,
        status: ServiceRequestStatus.ARCHIVED,
        client: generateClients().at(0) as User,
        postcode: "2001",
        suburb: "Sydney",
        cost: 51.40
    },
]

/**
 * Function to generate a list of professionals
 */
export function generateProfessionals() : User[] {
    let professionals : User[] = [];

    for(let i=100; i<150; i++) {
        const newProfessional : User = {
            userId: i,
            firstName: `Firstname ${i}`,
            lastName: `Lastname ${i}`,
            email: `${i}@gmail.com`,
            password: "123",
            address: {
                streetNumber: i.toString(),
                streetName: "Demo Street",
                suburb: "Demo Suburb",
                postcode: `12${i}`
            },
            mobile: `12345678${i}`,
            userType: UserType.PROFESSIONAL
        }

        professionals.push(newProfessional);
    }

    return professionals;
}

/**
 * Function to return dummy service results
 * @param showNew boolean flag to indicate to return new results too (we don't want this on the Professional's view history page)
 * NOTE: Only should be required for the mock data - the backend should be sending us the actual list we want from the endpoint
 */
export function generateDummyServiceRequests(showNew: boolean) {
    return !showNew ? dummyServiceRequests.filter((request) => request.status !== ServiceRequestStatus.NEW) : dummyServiceRequests;
}

export function generateNewDummyServiceRequests() {
    return dummyServiceRequests.filter((request) => request.status === ServiceRequestStatus.NEW);
}