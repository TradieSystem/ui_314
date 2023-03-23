import {ServiceRequest, ServiceRequestStatus} from "../../../../Types/ServiceRequest";
import {ServiceType} from "../../../../Types/ServiceType";

//Essentially what we expect from the backend
export const dummyServiceRequests : ServiceRequest[] = [
    {
        applicationNumber: 2,
        applicationDate: new Date("01/02/2022"),
        serviceType: ServiceType.FENCE_INSTALLATION,
        status: ServiceRequestStatus.COMPLETE,
        cost: 101.55,
        description: "I want a new fence please"
    },
    {
        applicationNumber: 1,
        applicationDate: new Date("01/01/2021"),
        serviceType: ServiceType.PLUMBING,
        status: ServiceRequestStatus.ARCHIVED,
        cost: 250.95
    },
    {
        applicationNumber: 3,
        applicationDate: new Date("03/03/2023"),
        serviceType: ServiceType.OVEN_REPAIRS,
        status: ServiceRequestStatus.PENDING_COMPLETION,
        cost: 143.15
    },
    {
        applicationNumber: 4,
        applicationDate: new Date("03/15/2023"),
        serviceType: ServiceType.ROOF_CLEANING,
        status: ServiceRequestStatus.PENDING_ACCEPTANCE,
        cost: 32.50
    },
    {
        applicationNumber: 5,
        applicationDate: new Date("03/07/2023"),
        serviceType: ServiceType.TREE_REMOVAL,
        status: ServiceRequestStatus.NEW,
        cost: 0
    },
    {
        applicationNumber: 6,
        applicationDate: new Date("03/10/2023"),
        serviceType: ServiceType.PLUMBING,
        status: ServiceRequestStatus.NEW,
        cost: 0
    },
    {
        applicationNumber: 7,
        applicationDate: new Date("03/11/2022"),
        serviceType: ServiceType.FENCE_INSTALLATION,
        status: ServiceRequestStatus.ARCHIVED,
        cost: 22.24
    },
    {
        applicationNumber: 10,
        applicationDate: new Date("03/07/2023"),
        serviceType: ServiceType.TREE_REMOVAL,
        status: ServiceRequestStatus.COMPLETE,
        cost: 101.23
    },
    {
        applicationNumber: 8,
        applicationDate: new Date("03/12/2023"),
        serviceType: ServiceType.OVEN_REPAIRS,
        status: ServiceRequestStatus.PENDING_COMPLETION,
        cost: 114.34
    },
    {
        applicationNumber: 9,
        applicationDate: new Date("03/15/2023"),
        serviceType: ServiceType.ROOF_CLEANING,
        status: ServiceRequestStatus.PENDING_ACCEPTANCE,
        cost: 87.23
    },
    {
        applicationNumber: 11,
        applicationDate: new Date("12/15/2020"),
        serviceType: ServiceType.OVEN_REPAIRS,
        status: ServiceRequestStatus.ARCHIVED,
        cost: 51.40
    },
]