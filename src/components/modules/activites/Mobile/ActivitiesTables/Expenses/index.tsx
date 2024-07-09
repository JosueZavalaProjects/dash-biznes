import { useEffect, useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import { data as PurchaseData } from "@/constants/activities/purchases";
import { useDates } from "@/hooks/useDates";
import { useExpenses } from "@/hooks/useExpenses";
import {
  LabelText,
  TimeOption,
  colorLabel,
  datesType,
} from "@/types/activities";
import { Purchase } from "@/types/purchases";

import { SummaryLabel } from "../../components/SummaryLabel";
import { TimeOptions } from "../../components/TimeOptions";
import { ExpensesMobileTable } from "./Table";

export const ExpensesActivity = () => {
  const [expenses, setExpenses] = useState<Purchase[]>(PurchaseData);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [timeOptionSelected, setTimeOptionSelected] = useState<TimeOption>(
    TimeOption.day
  );

  const {
    GetCurrentDayDates,
    GetCurrentWeekDates,
    GetCurrentMonthDates,
    GetCurrentYearDates,
  } = useDates();
  const { getExpensesByDate } = useExpenses();

  const handleGetExpensesByDate = async (
    startDate: string,
    endDate: string
  ) => {
    const newExpenses = await getExpensesByDate(startDate, endDate);

    setExpenses(newExpenses);
  };

  const handleSetDates = () => {
    if (timeOptionSelected === TimeOption.day) return GetCurrentDayDates();
    if (timeOptionSelected === TimeOption.week) return GetCurrentWeekDates();
    if (timeOptionSelected === TimeOption.month) return GetCurrentMonthDates();
    if (timeOptionSelected === TimeOption.year) return GetCurrentYearDates();

    return { startDate: "", endDate: "" };
  };

  const handleCalculateTotalExpenses = () =>
    expenses.length
      ? expenses.map((expense) => expense.amount).reduce((a, b) => a + b)
      : 0;

  useEffect(() => {
    setTotalExpenses(handleCalculateTotalExpenses());
  }, [expenses]);

  useEffect(() => {
    const { startDate, endDate }: datesType = handleSetDates();
    if (!startDate && !endDate) return;

    handleGetExpensesByDate(startDate, endDate);
  }, [timeOptionSelected]);

  return (
    <ContainerCard>
      <div className="flex flex-col text-center text-2xl gap-6">
        <div className="text-main-blue font-bold">{`Gastos ${LabelText[timeOptionSelected]}`}</div>
        <TimeOptions
          timeOptionSelected={timeOptionSelected}
          setTimeOptionSelected={setTimeOptionSelected}
        />
        <SummaryLabel
          text={`Gastos ${LabelText[timeOptionSelected]}`}
          color={colorLabel.red}
          amount={totalExpenses}
        />
        <ExpensesMobileTable expenses={expenses} />
      </div>
    </ContainerCard>
  );
};
