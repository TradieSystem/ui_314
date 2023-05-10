import {render, screen} from "@testing-library/react";
import React from "react";
import ReviewCarousel from "./ReviewCarousel";
import {dummyServiceRequests} from "../../Utilities/GenerateDummyData";

describe('<ReviewCarousel>', () => {
    test('should render the <ReviewCarousel> with the correct structure', () => {
        render(<ReviewCarousel filteredReviews={dummyServiceRequests}/>);

        //The list of reviews should be long enough to span over multiple pages
        expect(screen.getByRole('button', {
            name: /previous/i
        })).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /next/i
        })).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /1/i
        })).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /2/i
        })).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /3/i
        })).toBeInTheDocument();
        expect(screen.getByRole('button', {
            name: /4/i
        })).toBeInTheDocument();

        //The first review
        expect(screen.getAllByText(/roof cleaning/i)).toHaveLength(5);
        expect(screen.getAllByText(/\/5/i)).toHaveLength(27);
        expect(screen.getAllByText(/service/i)).toHaveLength(27);
        expect(screen.getAllByText(/review/i)).toHaveLength(27);
        expect(screen.getAllByText(/rating/i)).toHaveLength(27);
    });
});
