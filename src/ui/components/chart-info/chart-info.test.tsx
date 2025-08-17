import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { ChartInfo } from "./chart-info";

test("ChartInfo renders correctly", () => {
    // bounds must be a tuple of exactly 2 Dates
    const bounds: [Date, Date] = [new Date(2021, 2, 1), new Date(2021, 2, 2)];

    render(<ChartInfo bounds={bounds} />);

    // Check that the elements exist (React 19-safe async)
    expect(screen.getByText(/01 Mar 2021/)).toBeInTheDocument();
    expect(screen.getByText(/02 Mar 2021/)).toBeInTheDocument();
    expect(screen.getByText(/to/)).toBeInTheDocument();

    // Check wrapper div class using data-testid
    const wrapper = screen.getByTestId("chart-info-wrapper");
    expect(wrapper).toHaveClass("chart-info-wrapper");

    // Snapshot test
    expect(wrapper).toMatchSnapshot();
});
