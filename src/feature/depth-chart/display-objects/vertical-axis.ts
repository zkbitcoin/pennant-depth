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

  private formatNumber(num: number) {
    if (num >= 1000) {
      return Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      }).format(num);
    } else {
      return num + "";
    }
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
    // console.log("**VOLUMES**", ticks);
    // console.log("**VOLUMES**", formatTicks);
    // const length = ticks[ticks.length - 1]?.toLocaleString().length;
    // const yOffset = 5 * length + 20;
    const tickFormat = scale.tickFormat(numTicks); // number toString func, add comma if larger than 1000
    const enter = ticks.filter(
      (tick) => !this.nodeByKeyValue.has(tickFormat(tick)),
    );
    // console.log("**VOLUME enters**", enter.map(et => tickFormat(et)));
    const update = ticks.filter((tick) =>
      this.nodeByKeyValue.has(tickFormat(tick)),
    );

    const exit = [...this.nodeByKeyValue.keys()].filter(
      (node) => !(ticks.map(tickFormat).indexOf(node) !== -1),
    );

    for (const node of enter) {
      const text = new Text(this.formatNumber(node), {
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
      text.x = width + 5 * resolution;
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
      text.x = width + 5 * resolution;
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
