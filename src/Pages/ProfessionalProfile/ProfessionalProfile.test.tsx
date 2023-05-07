import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import axios from "axios";
import React from "react";
import {dummyProfessionalUser} from "../../Contexts/AuthContext";
import {dummyServiceRequests} from "../../Utilities/GenerateDummyData";
import ProfessionalProfile from "./ProfessionalProfile";

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

//Mocked values
const data = dummyServiceRequests;
jest.mock('./ReviewCarousel', () => () => {
    return (
        <div>
            Mocked Carousel
        </div>
    )
});

const TestComponent = () => {
    localStorage.setItem("user", JSON.stringify(dummyProfessionalUser));
    localStorage.setItem("auth_token", JSON.stringify("ABC123"));

    return (
        <MemoryRouter>
            <ProfessionalProfile/>
        </MemoryRouter>
    );
};

describe('<ProfessionalProfile>', () => {
    test('should render the <ProfessionalProfile> with the correct structure', async () => {
        mockedAxios.get.mockResolvedValue({data: data});

        render(TestComponent());

        expect(screen.getByRole('img', {
            name: /travis howard/i
        })).toBeInTheDocument();

        expect(screen.getByRole('heading', {
            name: /bob bobby/i
        })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Mocked Carousel')).toBeInTheDocument();
        });

        expect(screen.queryByText('There Are No Reviews')).not.toBeInTheDocument();
    });

    test('should render the error state if there was an error retrieving service requests', async () => {
        mockedAxios.get.mockResolvedValue({data: "an error"});

        render(TestComponent());

        expect(screen.getByRole('img', {
            name: /travis howard/i
        })).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('There Are No Reviews')).toBeInTheDocument();
        });

        expect(screen.queryByText('Mocked Carousel')).not.toBeInTheDocument();
    });
});