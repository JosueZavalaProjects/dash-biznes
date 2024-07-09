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

export type SalesColumnsProps = {
  handleEditSale: (id: string) => void;
  handleDeleteSale: (id: string) => void;
};

export type datesType = { startDate?: string; endDate?: string };

export enum Activity {
  sale,
  expense,
  utility,
}

export type ActivityType = {
  type: Activity;
  date: string | Date;
  amount: number;
};

export const ACTIVITIES_LABEL = {
  [Activity.sale]: "Ventas",
  [Activity.expense]: "Gastos",
  [Activity.utility]: "Ganancias",
};
