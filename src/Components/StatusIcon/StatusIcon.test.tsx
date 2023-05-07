import React from "react";
import {StatusIcon} from "./StatusIcon";
import {render, screen} from "@testing-library/react";
import {ServiceRequestStatus} from "../../Types/ServiceRequest";

describe('should render the correct <StatusIcon> for the prop passed in', () => {
    test('New', () => {
        render(<StatusIcon status={ServiceRequestStatus.NEW} />);

        expect(screen.getByTestId('CircleIcon')).toHaveStyle({color: "#57aafc"});
    });

    test('Archived', () => {
        render(<StatusIcon status={ServiceRequestStatus.ARCHIVED} />);

        expect(screen.getByTestId('CircleIcon')).toHaveStyle({color: "lightgrey"});
    });

    test('Complete', () => {
        render(<StatusIcon status={ServiceRequestStatus.COMPLETE} />);

        expect(screen.getByTestId('CircleIcon')).toHaveStyle({color: "#7eef7e"});
    });

    test('Pending Completion', () => {
        render(<StatusIcon status={ServiceRequestStatus.PENDING_COMPLETION} />);

        expect(screen.getByTestId('CircleIcon')).toHaveStyle({color: "orange"});
    });
});