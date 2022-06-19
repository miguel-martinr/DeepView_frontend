import { PartialEventContext } from "chartjs-plugin-annotation";

export function average(ctx: PartialEventContext) {
  const values = ctx.chart.data.datasets[0].data as number[];
  return values.reduce((a, b) => a + b, 0) / values.length;
}