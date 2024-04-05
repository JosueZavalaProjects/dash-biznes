"use client";
import { useEffect } from "react";

import { SimpleTabs } from "@/components/ui/simpleTabs";
import { TabSelection } from "@/components/ui/tabSelection";
import { TAB_KEYS } from "@/constants/activities/purchases";
import { useDates } from "@/hooks/useDates";
import { useSales } from "@/hooks/useSales";

import { SelectMonths } from "./components/selectMonths";
import useActivitiesState from "./states/activities-state";
import useActivitiesDateState from "./states/activities-dates-state";

export default function Activities() {
  const { GetLastDate, GetCurrentDate } = useDates();
  const { tabsContents, menuNav, tabName, setTabName } = useActivitiesState();

  const { setStartDate, setEndDate } = useActivitiesDateState();
  const { GetSalesByDate } = useSales();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    /* console.log(e.target.value); */
    const startDate = e.target.value;
    const lastDate = GetLastDate(startDate);

    setStartDate(startDate);
    setEndDate(lastDate);
  };

  /* const handleGetSalesByDate = async (startDate: string, endDate: string) => {
    const result = await GetSalesByDate(startDate, endDate);
    console.log(result);
  }; */

  const generateInitialDates = () => {
    const startDate = GetCurrentDate();
    const endDate = GetLastDate(startDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    generateInitialDates();
    /* handleGetSalesByDate(); */
  }, []);

  /* useEffect(() => {
    if (!startDate && !endDate) return;

    handleGetSalesByDate(startDate, endDate);
  }, [startDate, endDate]); */

  return (
    <div className="grid">
      <TabSelection
        navItems={menuNav}
        tabName={tabName}
        setTabName={setTabName}
      />
      {tabName === TAB_KEYS.SALES && (
        <SelectMonths handleChange={handleChange} />
      )}

      <SimpleTabs tabsContents={tabsContents} tabNameSelected={tabName} />
    </div>
  );
}
