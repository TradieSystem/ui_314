import React from 'react';
import App from './App';
import {render, screen} from "@testing-library/react";

describe('<App>', () => {
    test('should render the <App> with the correct structure', () => {
        render(<App/>);
    });
});
