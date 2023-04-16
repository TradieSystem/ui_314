import {ServiceType} from "./ServiceType";
import {User} from "./User";

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
    client: number;
    /**
     * An array of the {@link User} Professionals who have
     */
    applications?: ServiceRequestApplication[];
    /**
     * (Optional) description client has attached to the request
     */
    description?: string;
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
    userID: number;
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
    //Request has had professional applicants, client has chosen one, and is now pending acceptance from the professional
    PENDING_ACCEPTANCE = 'Pending Acceptance',
    //Request has been accepted by a professional, and not yet completed
    PENDING_COMPLETION = 'Pending Completion',
    //Job completed, but no review or rating left yet
    COMPLETE = 'Complete',
    //Job completed and review/rating left
    ARCHIVED = 'Archived'
}