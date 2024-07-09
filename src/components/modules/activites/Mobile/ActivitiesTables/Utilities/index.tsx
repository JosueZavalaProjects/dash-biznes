import { useEffect, useState } from "react";

import dayjs from "dayjs";

import { ContainerCard } from "@/components/ui/containerCard";
import { data as PurchaseData } from "@/constants/activities/purchases";
import { data as SalesData } from "@/constants/activities/sales";
import { useDates } from "@/hooks/useDates";
import { useExpenses } from "@/hooks/useExpenses";
import { useSales } from "@/hooks/useSales";
import {
  Activity,
  ActivityType,
  LabelText,
  TimeOption,
  colorLabel,
  datesType,
} from "@/types/activities";
import { Purchase } from "@/types/purchases";
import { Sale } from "@/types/sales";

import { SummaryLabel } from "../../components/SummaryLabel";
import { TimeOptions } from "../../components/TimeOptions";
import { UtilitiesMobileTable } from "./Table";

const MOCK_ACTIVITIES: ActivityType[] = [
  { type: Activity.expense, date: "10/10/2023", amount: 10 },
  { type: Activity.sale, date: "10/10/2023", amount: 2 },
  { type: Activity.utility, date: "10/10/2023", amount: 15 },
];
export const UtilitiesActivity = () => {
  const [activities, setActivities] = useState<ActivityType[]>(MOCK_ACTIVITIES);
  const [utility, setUtility] = useState<number>(0);
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
  const { GetSalesByDate } = useSales();

  const handleSetDates = () => {
    if (timeOptionSelected === TimeOption.day) return GetCurrentDayDates();
    if (timeOptionSelected === TimeOption.week) return GetCurrentWeekDates();
    if (timeOptionSelected === TimeOption.month) return GetCurrentMonthDates();
    if (timeOptionSelected === TimeOption.year) return GetCurrentYearDates();

    return { startDate: "", endDate: "" };
  };

  const handleGetExpensesByDate = async (
    startDate: string,
    endDate: string
  ) => {
    const newExpenses = await getExpensesByDate(startDate, endDate, false);

    return newExpenses;
  };

  const handleGetSalesByDate = async (startDate: string, endDate: string) => {
    const newSales = await GetSalesByDate(startDate, endDate, false);

    return newSales;
  };

  const handleGetUtility = async (dates: datesType) => {
    const { startDate, endDate } = dates;
    const newExpenses = await handleGetExpensesByDate(startDate!, endDate!);
    const newSales = await handleGetSalesByDate(startDate!, endDate!);

    const expensesActivities = createActivitesArray(newExpenses);
    const salesActivites = createActivitesArray(newSales);

    const mergeActivities = salesActivites.concat(expensesActivities);

    const sortActivities = mergeActivities.sort((a, b) =>
      a.date < b.date ? 1 : -1
    );

    const utilityActivity = getUtilityActivity(sortActivities);
    sortActivities.unshift(utilityActivity);

    setActivities(sortActivities);
  };

  const createActivitesArray = (activityArray: Purchase[] | Sale[]) => {
    return activityArray.map((activity) => {
      return {
        type: isPuchase(activity) ? Activity.expense : Activity.sale,
        date: activity.date,
        amount: isPuchase(activity)
          ? -(activity as Purchase).amount
          : activity.total,
      };
    });
  };

  const isPuchase = (activity: Purchase | Sale): activity is Purchase => {
    return (activity as Purchase).amount !== undefined;
  };

  const getUtilityActivity = (activityArray: ActivityType[]): ActivityType => {
    const newUtility = activityArray.length
      ? activityArray.map((activity) => activity.amount).reduce((a, b) => a + b)
      : 0;

    setUtility(newUtility);
    return {
      type: Activity.utility,
      date: dayjs(new Date()).format("DD/MM/YYYY"),
      amount: newUtility,
    };
  };

  useEffect(() => {
    const { startDate, endDate }: datesType = handleSetDates();
    if (!startDate && !endDate) return;

    setActivities([]);
    handleGetUtility({ startDate, endDate });
  }, [timeOptionSelected]);

  return (
    <ContainerCard>
      <div className="flex flex-col text-center text-2xl gap-6">
        <div className="text-main-blue font-bold">Utilidades del día</div>
        <TimeOptions
          timeOptionSelected={timeOptionSelected}
          setTimeOptionSelected={setTimeOptionSelected}
        />
        <SummaryLabel
          text={`Utilidades ${LabelText[timeOptionSelected]}`}
          color={colorLabel.blue}
          amount={utility}
        />
        <UtilitiesMobileTable activities={activities} />
      </div>
    </ContainerCard>
  );
};
