import "./x-axis-view.css";

import { forwardRef } from "react";

import { D3fcCanvas } from "../plot-container/D3fcWrappers";
import { D3fcSVG } from "../plot-container/D3fcWrappers";

export type XAxisViewProps = {
  simple: boolean;
};

export const XAxisView = forwardRef<HTMLDivElement, XAxisViewProps>(
  ({ simple = false }, ref) => {
    return (
      <div
        ref={ref}
        className="x-axis-container"
        style={{
          height: simple ? 0 : "24px",
          visibility: simple ? "hidden" : "visible",
        }}
      >
        <D3fcCanvas className="x-axis" use-device-pixel-ratio />
        <D3fcSVG className="x-axis-interaction" />
      </div>
    );
  },
);
