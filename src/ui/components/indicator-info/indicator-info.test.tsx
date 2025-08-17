import React from "react";
import "@testing-library/jest-dom";
import { render, screen, act } from "@testing-library/react";
import { IndicatorInfo } from "./indicator-info";

describe("IndicatorInfo component", () => {
    const infoData = [
        { id: "index", label: "RSI", value: "100", displayWhileNoTrading: true },
    ];

    test("renders correctly with noTrading=false", () => {
        let container: HTMLElement;
        act(() => {
            ({ container } = render(<IndicatorInfo title="RSI" info={infoData} noTrading={false} />));
        });

        const wrapper = screen.getByTestId("indicator-info-wrapper");

        // Check that the flattened text content contains the correct strings
        expect(wrapper.textContent).toContain("RSI");
        expect(wrapper.textContent).toContain("100");
        expect(wrapper.textContent).not.toContain("No trading");

        expect(wrapper).toMatchSnapshot();
    });

    test("renders correctly with noTrading=true", () => {
        let container: HTMLElement;
        act(() => {
            ({ container } = render(<IndicatorInfo title="RSI" info={infoData} noTrading={true} />));
        });

        const wrapper = screen.getByTestId("indicator-info-wrapper");

        expect(wrapper.textContent).toContain("RSI");
        expect(wrapper.textContent).toContain("100");
        expect(wrapper.textContent).toContain("No trading");

        expect(wrapper).toMatchSnapshot();
    });

    test("renders close button if closeable=true", () => {
        const onCloseMock = jest.fn();
        act(() => {
            render(
                <IndicatorInfo
                    title="RSI"
                    info={infoData}
                    noTrading={false}
                    closeable={true}
                    onClose={onCloseMock}
                />
            );
        });

        const closeButton = screen.getByTitle("Remove");
        expect(closeButton).toBeInTheDocument();

        // simulate click
        closeButton.click();
        expect(onCloseMock).toHaveBeenCalled();
    });
});
