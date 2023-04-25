import {ServiceType} from "./ServiceType";

/**
 * Interface to describe a service request.
 */
export interface ServiceRequest {
    /**
     * Unique identifier of a service request
     */
    requestID: number;
    /**
     * Date of the service request being made (will be in MM/DD/YYYY format, and cast to dd/MM/YYYY when displaying)
     */
    requestDate: Date;      //NOTE: Date is in MM/DD/YYYY format
    /**
     * The service type of the service request
     */
    serviceType: ServiceType;
    /**
     * The status of the service request
     */
    requestStatus: ServiceRequestStatus;
    /**
     * Postcode of the service being conducted
     */
    postcode: string;
    /**
     * Client who has made the service request
     */
    clientID: number;
    /**
     * Professional who has been assigned to the service request
     */
    professionalID?: number;
    /**
     * An array of the {@link User} Professionals who have
     */
    applications?: ServiceRequestApplication[];
    /**
     * (Optional) description client has attached to the request
     */
    jobDescription?: string;
    /**
     * (Optional) rating that was left by the client on the {@link ServiceRequest} AFTER it has been marked as {@link ServiceRequestStatus.COMPLETE} - should be an integer value.
     */
    rating?: number;
    /**
     * (Optional) review that was left by the client on the {@link ServiceRequest} AFTER it has been marked as {@link ServiceRequestStatus.COMPLETE}
     */
    review?: string;
}

/**
 * An interface to describe the object that is sent to the backend when a Client {@link User} leaves a review on a {@link ServiceRequest}
 */
export interface ServiceRequestReview {
    /**
     * The MANDATORY unique identifier request ID of the {@link ServiceRequest}
     */
    requestID: number;
    /**
     * A MANDATORY rating that is an INTEGER value between 1-5 (inclusive of both)
     */
    rating: number;
    /**
     * (Optional) review description
     */
    review?: string;
}

/**
 * DO NOT USE ON FRONTEND TO DISPLAY DATA / CAST TO TYPE - ONLY DEFINES THE OBJECT BEING SENT TO BACKEND WHEN WE CREATE A REQUEST
 */
export interface ServiceRequestCreate {
    requestID: number;
    requestDate: string;
    serviceType: ServiceType;
    requestStatus: ServiceRequestStatus;
    postcode: string;
    clientID: number;
    jobDescription?: string;
}

export interface ServiceRequestApplication {
    /**
     * Unique identifier of a service request application
     */
    requestID: number;
    /**
     * Unique identifier of a service request
     */
    applicationID: number;
    /**
     * Date that the professional has applied (will be in MM/DD/YYYY format, and cast to dd/MM/YYYY when displaying)
     */
    offerDate: Date;
    /**
     * User ID of the applicant
     */
    professionalID: number;
    /**
     * Cost that has been submitted as part of the service request
     */
    cost: number;
    /**
     * Current {@link ServiceRequestApplicationStatus}
     */
    applicationStatus: ServiceRequestApplicationStatus;
}

/**
 * A status to represent the {@link ServiceRequestApplication}
 * When a {@link ServiceRequest} is created, the {@link ServiceRequestApplicationStatus} is {@code Pending}
 * When a Client {@link User} selects a professional, they will have their {@link ServiceRequestApplication} {@code APPROVED}.
 * All other {@link ServiceRequestApplication} for the {@link ServiceRequest} will be {@code DECLINED}
 */
export enum ServiceRequestApplicationStatus {
    APPROVED = "Approved",
    DECLINED = "Declined",
    PENDING = "Pending"
}

export enum ServiceRequestStatus {
    //New request with no confirmed professional assigned
    NEW = 'New',
    //@DEPRECATED Request has had professional applicants, client has chosen one, and is now pending acceptance from the professional
    // PENDING_ACCEPTANCE = 'Pending Acceptance',
    //Request has been accepted by a professional, and not yet completed
    PENDING_COMPLETION = 'Pending Completion',
    //Job completed, but no review or rating left yet
    COMPLETE = 'Complete',
    //Job completed and review/rating left
    ARCHIVED = 'Archived'
}