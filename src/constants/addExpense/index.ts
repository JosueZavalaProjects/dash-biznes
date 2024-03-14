import { Expense, ExpenseType, ExpensesKeys } from "@/types/addExpense";

export const EXPENSES_KEYS: { [key: string]: ExpensesKeys } = {
  NAME: "name",
  TYPE: "type",
  AMOUNT: "amount",
};

export const EXPENSES_TYPES_KEYS: { [key: string]: ExpenseType } = {
  PERSONAL: "personal",
  RENT: "rent",
  PUBLIC: "public",
  SUPPLIES: "supplies",
  MARKETING: "marketing",
  SALES: "sales",
  FINANCIAL: "financial",
  TECHNOLOGY: "technology",
  INSURANCE: "insurance",
  LEGAL: "legal",
  OTHERS: "others",
};
export const EXPENSES_TYPES_LABELS = {
  [EXPENSES_TYPES_KEYS.PERSONAL]: "Gastos de personal",
  [EXPENSES_TYPES_KEYS.RENT]: "Gastos de alquiler",
  [EXPENSES_TYPES_KEYS.PUBLIC]: "Gastos públicos",
  [EXPENSES_TYPES_KEYS.SUPPLIES]: "Gastos de suministros",
  [EXPENSES_TYPES_KEYS.MARKETING]: "Gastos de marketing y publicidad",
  [EXPENSES_TYPES_KEYS.SALES]: "Gastos de ventas",
  [EXPENSES_TYPES_KEYS.FINANCIAL]: "Gastos financieros",
  [EXPENSES_TYPES_KEYS.TECHNOLOGY]: "Gastos de tecnología",
  [EXPENSES_TYPES_KEYS.INSURANCE]: "Gastos de seguros",
  [EXPENSES_TYPES_KEYS.LEGAL]: "Gastos legales y consultoria",
  [EXPENSES_TYPES_KEYS.OTHERS]: "Otros",
};

export const MOCK_EXPENSE: Expense = {
  name: "",
  type: "others",
  amount: 0,
};
