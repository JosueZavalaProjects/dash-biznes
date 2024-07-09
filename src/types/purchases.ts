import { Expense } from "./addExpense";

export type Purchase = Expense & { date: string | Date };
