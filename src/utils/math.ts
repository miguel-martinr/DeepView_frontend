import { PartialEventContext } from "chartjs-plugin-annotation";

export function average(ctx: PartialEventContext) {
  const values = ctx.chart.data.datasets[0].data as number[];
  return values.reduce((a, b) => a + b, 0) / values.length;
}


export function groupArr<T>(data: Array<T>, size: number): T[][] {
  const group: T[][] = [];
  for (var i = 0, j = 0; i < data.length; i++) {
      if (i >= size && i % size === 0)
          j++;
      group[j] = group[j] || [];
      group[j].push(data[i])
  }
  return group;
}