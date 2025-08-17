import React, { forwardRef } from "react";
import { FcElement } from "@util/types";

function createWrapper<T extends HTMLElement>(tagName: string) {
    return forwardRef<T, React.HTMLAttributes<T>>((props, ref) => {
        const { children, ...rest } = props;
        return React.createElement(tagName, { ref, ...rest }, children);
    });
}

export const D3fcGroup = createWrapper<FcElement>("d3fc-group");
export const D3fcCanvas = createWrapper<FcElement>("d3fc-canvas");
export const D3fcSVG = createWrapper<FcElement>("d3fc-svg");
