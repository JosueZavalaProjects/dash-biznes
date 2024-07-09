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
  [EXPENSES_TYPES_KEYS.PERSONAL]: "personal",
  [EXPENSES_TYPES_KEYS.RENT]: "alquiler",
  [EXPENSES_TYPES_KEYS.PUBLIC]: "públicos",
  [EXPENSES_TYPES_KEYS.SUPPLIES]: "suministros",
  [EXPENSES_TYPES_KEYS.MARKETING]: "marketing y publicidad",
  [EXPENSES_TYPES_KEYS.SALES]: "ventas",
  [EXPENSES_TYPES_KEYS.FINANCIAL]: "financieros",
  [EXPENSES_TYPES_KEYS.TECHNOLOGY]: "tecnología",
  [EXPENSES_TYPES_KEYS.INSURANCE]: "seguros",
  [EXPENSES_TYPES_KEYS.LEGAL]: "legales y consultoria",
  [EXPENSES_TYPES_KEYS.OTHERS]: "Otros",
};

export const MOCK_EXPENSE: Expense = {
  name: "",
  type: "others",
  amount: 0,
};
