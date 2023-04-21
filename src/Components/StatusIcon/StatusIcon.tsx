import React from 'react';
import {ServiceRequestStatus} from "../../Types/ServiceRequest";
import {Circle} from "@mui/icons-material";

/**
 * Interface describing the props of a {@link StatusIcon}
 */
export interface StatusIconProps {
    /**
     * Status
     */
    status: ServiceRequestStatus;
}
/**
 * Component to render a small status icon, matching the status of a {@link ServiceRequestStatus}
 */
export const StatusIcon = ({status}: StatusIconProps) : JSX.Element => {
    let color;
    switch (status) {
        case ServiceRequestStatus.NEW:
            color = '#57aafc';
            break;
        case ServiceRequestStatus.ARCHIVED:
            color = 'lightgrey';
            break;
        case ServiceRequestStatus.COMPLETE:
            color = '#7eef7e';
            break;
        // case ServiceRequestStatus.PENDING_ACCEPTANCE:
        //     color = '#ffe785';
        //     break;
        case ServiceRequestStatus.PENDING_COMPLETION:
            color = 'orange';
            break;
    }
    return (
        <Circle sx={{color: `${color}`, width: '0.75rem'}}/>
    );
}