import {ServiceType} from "./ServiceType";
import {User} from "./User";

/**
 * Interface to describe a service request.
 */
export interface ServiceRequest {
    /**
     * Unique identifier of a service request
     */
    applicationNumber: number;
    /**
     * Date of the service request being made (will be in MM/DD/YYYY format, and cast to dd/MM/YYYY when displaying)
     */
    applicationDate: Date;      //NOTE: Date is in MM/DD/YYYY format
    /**
     * The service type of the service request
     */
    serviceType: ServiceType;
    /**
     * The status of the service request
     */
    status: ServiceRequestStatus;
    /**
     * Postcode of the service being conducted
     */
    postcode: string;
    /**
     * Suburb of the service being conducted
     */
    suburb: string;
    /**
     * Client who has made the service request
     */
    client: User;
    /**
     * (Optional) Professional who has been assigned to the service request
     */
    professional?: User;
    /**
     * (Optional) List of Professional {@link User} id's who have applied for the job listing
     */
    applicantIds?: number[];
    /**
     * Cost if a Client is on {@link MembershipOption.PAY_AS_YOU_GO}
     */
    cost: number;
    /**
     * (Optional) description client has attached to the request
     */
    description?: string;
}

export enum ServiceRequestStatus {
    //New request with no confirmed professional assigned
    NEW = 'New',
    //Request has had professional applicants, client has chosen one, and is now pending acceptance from the professionl
    PENDING_ACCEPTANCE = 'Pending Acceptance',
    //Request has been accepted by a professional, and not yet completed
    PENDING_COMPLETION = 'Pending Completion',
    //Job completed, but no review or rating left yet
    COMPLETE = 'Complete',
    //Job completed and review/rating left
    ARCHIVED = 'Archived'
}