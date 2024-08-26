import { Container, Text } from "@ui/renderer";
import { ScaleLinear } from "d3-scale";

import { AXIS_HEIGHT, FONT_SIZE } from "../depth-chart";
import { Colors } from "../helpers";

type HorizontalAxisColors = Pick<
  Colors,
  "backgroundSurface" | "textPrimary" | "textSecondary"
>;

/**
 * Draws a horizontal axis at the bottom of the chart
 */
export class HorizontalAxis extends Container {
  /**
   * Cache tick marks
   */
  private lastTicks: Text[] = [];

  constructor() {
    super();
  }

  public update(
    scale: ScaleLinear<number, number>,
    width: number,
    height: number,
    resolution: number = 1,
    colors: HorizontalAxisColors,
    domain: [number, number],
  ) {
    // const numTicks = width / resolution / 200;
    const numTicks = 5;
    const [start, end] = domain;
    if (Number.isNaN(start) || Number.isNaN(end)) return;
    const step = (end - start) / numTicks;
    const ticks: number[] = [];
    for (let i = 0.5; i < numTicks; i += 1) {
      const tick = start + i * step;
      ticks.push(tick);
    }
    const tickFormat = scale.tickFormat(numTicks);

    for (const node of this.lastTicks) {
      this.removeChild(node);
      this.removeChild(node);
    }
    this.lastTicks = [];

    for (const node of ticks) {
      const text = new Text(tickFormat(node), {
        fill: colors.textSecondary,
        fontFamily: "monospace",
        fontSize: FONT_SIZE,
      });
      const tickMark = new Text("|", {
        fill: colors.textSecondary,
        fontFamily: "monospace",
        fontWeight: "bold",
        fontSize: 5,
      });

      text.x = scale(node);
      text.y = height - (resolution * AXIS_HEIGHT) / 2 + 6;
      text.anchor.set(0.5, 0.5);

      tickMark.x = scale(node);
      tickMark.y = height - (resolution * AXIS_HEIGHT) / 2 - 12;
      tickMark.anchor.set(0.5, 0.5);

      text.updateText(); // TODO: Should not need to call th
      this.addChild(text);
      this.addChild(tickMark);
      this.lastTicks.push(text, tickMark);
    }
  }
}
