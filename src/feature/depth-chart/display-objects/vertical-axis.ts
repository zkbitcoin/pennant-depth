import { Container, Text } from "@ui/renderer";
import { ScaleLinear } from "d3-scale";

import { FONT_SIZE } from "../depth-chart";
import { Colors } from "../helpers";

type VerticalAxisColors = Pick<
  Colors,
  "backgroundSurface" | "textPrimary" | "textSecondary"
>;

/**
 * Draws a vertical axis at the right of the chart
 */
export class VerticalAxis extends Container {
  /**
   * Cache ticks
   */
  private nodeByKeyValue = new Map<string, Text>();
  /**
   * Cache tick marks
   */
  private tmByKeyValue = new Map<string, Text>();

  constructor() {
    super();
  }

  public update(
    scale: ScaleLinear<number, number>,
    width: number,
    height: number,
    resolution: number = 1,
    colors: VerticalAxisColors,
  ) {
    const numTicks = height / resolution / 50;
    const ticks = scale.ticks(numTicks).filter((tick) => tick !== 0);
    // const length = ticks[ticks.length - 1]?.toLocaleString().length;
    // const yOffset = 5 * length + 20;
    const tickFormat = scale.tickFormat(numTicks);

    const enter = ticks.filter(
      (tick) => !this.nodeByKeyValue.has(tickFormat(tick)),
    );

    const update = ticks.filter((tick) =>
      this.nodeByKeyValue.has(tickFormat(tick)),
    );

    const exit = [...this.nodeByKeyValue.keys()].filter(
      (node) => !(ticks.map(tickFormat).indexOf(node) !== -1),
    );

    for (const node of enter) {
      const text = new Text(tickFormat(node), {
        fill: colors.textSecondary,
        fontFamily: "monospace",
        fontSize: FONT_SIZE,
      });
      const tickMark = new Text("-", {
        fill: colors.textSecondary,
        fontFamily: "monospace",
        fontSize: 10,
      });

      // text.x = width - resolution * 7;
      text.x = width + 10;
      text.y = scale(node);
      text.anchor.set(0, 0.5);

      // tickMark.x = width - resolution * 7 + 10;
      tickMark.x = width;
      tickMark.y = scale(node);
      tickMark.anchor.set(0, 0.5);

      text.updateText(); // TODO: Should not need to call this

      this.nodeByKeyValue.set(tickFormat(node), text);
      this.tmByKeyValue.set(tickFormat(node) + "-", tickMark);
      this.addChild(text);
      this.addChild(tickMark);
    }

    for (const node of update) {
      const text = this.nodeByKeyValue.get(tickFormat(node))!;
      const tm = this.tmByKeyValue.get(tickFormat(node) + "-")!;

      text.style.fill = colors.textSecondary;
      // text.x = width - resolution * 7;
      text.x = width + 10;
      text.y = scale(node);

      // tm.x = width - resolution * 7 + 10;
      tm.x = width;
      tm.y = scale(node);
    }

    for (const node of exit) {
      const text = this.nodeByKeyValue.get(node)!;
      const tm = this.tmByKeyValue.get(node + "-")!;

      this.nodeByKeyValue.delete(node);
      this.removeChild(text);
      this.tmByKeyValue.delete(node);
      this.removeChild(tm);
    }
  }
}
