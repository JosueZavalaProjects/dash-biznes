export type Expense = {
  type: ExpenseType;
  name: string;
  amount: number;
};

export type ExpensesKeys = "type" | "name" | "amount";

export type ExpenseType =
  | "personal"
  | "rent"
  | "public"
  | "supplies"
  | "marketing"
  | "sales"
  | "financial"
  | "technology"
  | "insurance"
  | "legal"
  | "others";
