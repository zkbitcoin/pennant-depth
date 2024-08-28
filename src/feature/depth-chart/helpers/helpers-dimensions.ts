import { string2num } from "@util/misc";

export interface Dimensions {
  strokeWidth: number;
}

export function getDimensions(element: HTMLElement | null): Dimensions {
  const cssStyleDeclaration = element ? getComputedStyle(element) : null;

  const dpr = window.devicePixelRatio || 1;
  return {
    // strokeWidth: string2num(
    //   cssStyleDeclaration
    //     ?.getPropertyValue("--pennant-depth-stroke-width")
    //     .trim() || "1px",
    // ),
    strokeWidth: 2 * dpr,
  };
}
