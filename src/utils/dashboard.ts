import { MONTH_LABELS } from "@/constants/activities";
import { GraphData, GraphResult, GroupTotals } from "@/types/dashboard";

export const groupByMoth = (myArray: GraphResult[]): GroupTotals => {
  const groups = myArray.reduce(function (r: GroupTotals, o) {
    const { date, total } = o;
    const m = date.split("-")[1];
    r[`${m}`] ? r[m].push(total) : (r[m] = [total]);
    return r;
  }, {});

  return groups;
};

export const generateGraphData = (groupData: GroupTotals): GraphData[] => {
  const data: GraphData[] = [];
  for (const property in groupData) {
    const total = groupData[property].reduce((current, next) => current + next);
    const month = MONTH_LABELS[+property - 1].slice(0, 3);
    data.push({ name: month, total });
  }
  return data;
};
