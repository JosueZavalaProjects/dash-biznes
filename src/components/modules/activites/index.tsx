"use client";
import { useEffect } from "react";

import { SimpleTabs } from "@/components/ui/simpleTabs";
import { TabSelection } from "@/components/ui/tabSelection";
import { TAB_KEYS } from "@/constants/activities/purchases";
import { useDates } from "@/hooks/useDates";

import { SelectMonths } from "./components/selectMonths";
import useActivitiesDateState from "./states/activities-dates-state";
import useActivitiesState from "./states/activities-state";

export default function Activities() {
  const { GetLastDate, GetCurrentDate } = useDates();
  const { tabsContents, menuNav, tabName, setTabName } = useActivitiesState();

  const { setStartDate, setEndDate } = useActivitiesDateState();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const startDate = e.target.value;
    const lastDate = GetLastDate(startDate);

    setStartDate(startDate);
    setEndDate(lastDate);
  };

  const generateInitialDates = () => {
    const startDate = GetCurrentDate();
    const endDate = GetLastDate(startDate);
    setStartDate(startDate);
    setEndDate(endDate);
  };

  useEffect(() => {
    generateInitialDates();
  }, []);

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
