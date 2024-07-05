export enum Activites {
  sales,
  utilites,
  inventory,
  expenses,
}

export enum TimeOption {
  day,
  week,
  month,
  year,
}

export enum colorLabel {
  green,
  blue,
  red,
}

export const LabelText = {
  [TimeOption.day]: "del día",
  [TimeOption.week]: "de la semana",
  [TimeOption.month]: "del mes",
  [TimeOption.year]: "del año",
};
