import {MemoryRouter} from "react-router-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {Formik} from "formik";
import SignUp from "./SignUp";

const TestComponent = () => {
   return (
       <MemoryRouter>
          <SignUp />
       </MemoryRouter>
   );
}

describe('<SignUp>', () => {
   test('should render the <SignUp> with the structure of the first page', () => {
       render(TestComponent());

       expect(screen.getByRole('img', {
           name: /logo/i
       })).toBeInTheDocument();

       expect(screen.getByRole('textbox', {
           name: /first name/i
       })).toBeInTheDocument();

       expect(screen.getByRole('textbox', {
           name: /last name/i
       })).toBeInTheDocument();

       expect(screen.getByRole('textbox', {
           name: /email address/i
       })).toBeInTheDocument();

       expect(screen.getByRole('textbox', {
           name: /mobile/i
       })).toBeInTheDocument();
   });
});