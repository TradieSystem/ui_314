import React from 'react';
import {User} from "../Types/User";
import {MembershipOption, UserType} from "../Types/Account";
import {ServiceRequest, ServiceRequestApplicationStatus, ServiceRequestStatus} from "../Types/ServiceRequest";
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
            user_id: i,
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
        requestID: 2,
        requestDate: new Date("01/02/2022"),
        serviceType: ServiceType.FENCE_INSTALLATION,
        requestStatus: ServiceRequestStatus.COMPLETE,
        clientID: (generateClients().at(0) as User).user_id,
        postcode: "2000",
        jobDescription: "I want a new fence please"
    },
    {
        requestID: 1,
        requestDate: new Date("01/01/2021"),
        serviceType: ServiceType.PLUMBING,
        requestStatus: ServiceRequestStatus.ARCHIVED,
        postcode: "2111",
        clientID: (generateClients().at(0) as User).user_id,
    },
    {
        requestID: 3,
        requestDate: new Date("03/03/2023"),
        serviceType: ServiceType.OVEN_REPAIRS,
        requestStatus: ServiceRequestStatus.PENDING_COMPLETION,
        postcode: "2222",
        clientID: (generateClients().at(0) as User).user_id,
    },
    {
        requestID: 4,
        requestDate: new Date("03/15/2023"),
        serviceType: ServiceType.ROOF_CLEANING,
        requestStatus: ServiceRequestStatus.PENDING_ACCEPTANCE,
        clientID: (generateClients().at(0) as User).user_id,
        postcode: "2333",
    },
    {
        requestID: 5,
        requestDate: new Date("03/07/2023"),
        serviceType: ServiceType.TREE_REMOVAL,
        requestStatus: ServiceRequestStatus.NEW,
        postcode: "2444",
        clientID: (generateClients().at(0) as User).user_id,
        jobDescription: 'The tree is in the way'
    },
    {
        requestID: 6,
        requestDate: new Date("03/10/2023"),
        serviceType: ServiceType.PLUMBING,
        requestStatus: ServiceRequestStatus.NEW,
        clientID: (generateClients().at(0) as User).user_id,
        applications: [
            {
                requestID: 1,
                applicationID: 1,
                offerDate: new Date("05/05/2023"),
                userID: dummyProfessionalUser.user_id,
                cost: 50.50,
                applicationStatus: ServiceRequestApplicationStatus.PENDING
            }
        ],
        postcode: "2555",

    },
    {
        requestID: 7,
        requestDate: new Date("03/11/2022"),
        serviceType: ServiceType.FENCE_INSTALLATION,
        requestStatus: ServiceRequestStatus.ARCHIVED,
        clientID: (generateClients().at(0) as User).user_id,
        postcode: "2666",
    },
    {
        requestID: 10,
        requestDate: new Date("03/07/2023"),
        serviceType: ServiceType.TREE_REMOVAL,
        requestStatus: ServiceRequestStatus.COMPLETE,
        clientID: (generateClients().at(0) as User).user_id,
        postcode: "2777",
    },
    {
        requestID: 8,
        requestDate: new Date("03/12/2023"),
        serviceType: ServiceType.OVEN_REPAIRS,
        requestStatus: ServiceRequestStatus.PENDING_COMPLETION,
        clientID: (generateClients().at(0) as User).user_id,
        postcode: "2888",
    },
    {
        requestID: 9,
        requestDate: new Date("03/15/2023"),
        serviceType: ServiceType.ROOF_CLEANING,
        requestStatus: ServiceRequestStatus.PENDING_ACCEPTANCE,
        clientID: (generateClients().at(0) as User).user_id,
        postcode: "2999",
    },
    {
        requestID: 11,
        requestDate: new Date("12/15/2020"),
        serviceType: ServiceType.OVEN_REPAIRS,
        requestStatus: ServiceRequestStatus.ARCHIVED,
        clientID: (generateClients().at(0) as User).user_id,
        postcode: "2001",
    },
]

/**
 * Function to generate a list of professionals
 */
export function generateProfessionals() : User[] {
    let professionals : User[] = [];

    for(let i=100; i<150; i++) {
        const newProfessional : User = {
            user_id: i,
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
    return !showNew ? dummyServiceRequests.filter((request) => request.requestStatus !== ServiceRequestStatus.NEW) : dummyServiceRequests;
}

export function generateNewDummyServiceRequests() {
    return dummyServiceRequests.filter((request) => request.requestStatus === ServiceRequestStatus.NEW);
}