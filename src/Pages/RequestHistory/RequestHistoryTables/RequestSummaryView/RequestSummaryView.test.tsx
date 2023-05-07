import React from "react";
import {dummyServiceRequests} from "../../../../Utilities/GenerateDummyData";
import {RequestSummaryView} from "./RequestSummaryView";
import {render, screen} from "@testing-library/react";

const request = dummyServiceRequests[0];
const professionalName = "Professional One";

const TestComponent = () => {
   return (
       <RequestSummaryView request={request} professionalName={professionalName} />
   )
}

describe("<RequestSummaryView>", () => {
   test('should render the <RequestSummaryView> with the correct structure', () => {
      render(TestComponent());

      expect(screen.getByText(/application number:/i)).toBeVisible();
      expect(screen.getByText(/application date:/i)).toBeVisible();
      expect(screen.getByText(/02\/01\/2022/i)).toBeVisible();
      expect(screen.getByText(/service type:/i)).toBeVisible();
      expect(screen.getByText(/fence installation/i)).toBeVisible();
      expect(screen.getByText(/status:/i)).toBeVisible();
      expect(screen.getByText(/complete/i)).toBeVisible();
      expect(screen.getByText(/assigned professional:/i)).toBeVisible();
      expect(screen.getByText(/professional one/i)).toBeVisible();
      expect(screen.getByText(/cost:/i)).toBeVisible();
      expect(screen.getByText(/additional description:/i)).toBeVisible();
      expect(screen.getByText(/i want a new fence please/i)).toBeVisible();
   });
});