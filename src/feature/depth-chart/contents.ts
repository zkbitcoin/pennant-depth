import { Container, Renderer } from "@ui/renderer";
import { curveStepAfter } from "d3-shape";

import { DepthCurve } from "./display-objects";
import { Colors, Dimensions } from "./helpers";

type ContentsColors = Pick<
  Colors,
  "buyFill" | "buyStroke" | "sellFill" | "sellStroke"
>;

type ContentsDimensions = Pick<Dimensions, "strokeWidth">;

/**
 * Responsible for drawing area curves for depth chart.
 */
export class Contents {
  public stage: Container = new Container();
  public renderer: Renderer;

  public buyCurve: DepthCurve;
  public sellCurve: DepthCurve;

  public colors: ContentsColors;
  public dimensions: ContentsDimensions;

  constructor(options: {
    view: HTMLCanvasElement;
    resolution: number;
    width: number;
    height: number;
    colors: ContentsColors;
    dimensions: ContentsDimensions;
  }) {
    this.renderer = new Renderer({
      view: options.view,
      resolution: options.resolution,
      width: options.width,
      height: options.height,
    });

    this.colors = options.colors;
    this.dimensions = options.dimensions;

    this.buyCurve = new DepthCurve(
      options.colors.buyFill,
      options.colors.buyStroke,
      options.dimensions.strokeWidth,
      curveStepAfter,
    );

    this.sellCurve = new DepthCurve(
      options.colors.sellFill,
      options.colors.sellStroke,
      options.dimensions.strokeWidth,
      curveStepAfter,
    );

    this.stage.addChild(this.buyCurve);
    this.stage.addChild(this.sellCurve);
  }

  public render(): void {
    this.renderer.render(this.stage);
  }
  private _clipPoints = (points: [number, number][], width: number) => {
    const newPoints: [number, number][] = [];
    points.forEach((point, index) => {
      const [x, y] = point;
      if (index === 0) {
        newPoints.push(point);
      } else if (x > width && points[index - 1][0] <= width) {
        newPoints.push([width, y]);
      } else if (points[index - 1][0] > width) {
      } else {
        newPoints.push(point);
      }
    });

    return newPoints;
  };

  public update(
    buyPoints: [number, number][],
    sellPoints: [number, number][],
    offset: number,
  ): void {
    const resolution = this.renderer.resolution;

    this.buyCurve.update(
      buyPoints,
      this.renderer.view.height,
      resolution,
      this.colors.buyFill,
      this.colors.buyStroke,
      this.dimensions.strokeWidth,
    );

    this.sellCurve.update(
      this._clipPoints(sellPoints, this.renderer.view.width - offset),
      this.renderer.view.height,
      resolution,
      this.colors.sellFill,
      this.colors.sellStroke,
      this.dimensions.strokeWidth,
    );
  }
}
