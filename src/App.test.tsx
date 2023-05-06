import React from 'react';
import App from './App';
import {render} from "@testing-library/react";
import 'jest-canvas-mock';

const TestComponent = () => {
    return (
        <App/>
    )
}
describe('<App>', () => {
    test('should be able to call to render the <App>', () => {
        render(TestComponent());
    });
});
