"use client";
import { useEffect } from "react";

import { BlueAddButton } from "@/components/ui/buttons/blueButton";
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
    <div className="grid w-full pt-4">
      <section className="flex">
        <div className="w-1/4">
          <TabSelection
            navItems={menuNav}
            tabName={tabName}
            setTabName={setTabName}
          />
        </div>
        <div className="flex justify-between w-3/4">
          <div className="flex items-center text-center p-2 rounded-lg bg-primary-green text-white">
            Ventas del dia <span className="pl-2 font-bold"> Total: $8000</span>
          </div>
          <div>
            <BlueAddButton
              link={tabName === TAB_KEYS.SALES ? "/salesPoint" : "/addExpense"}
            />
          </div>
        </div>
      </section>
      <SelectMonths handleChange={handleChange} />

      <SimpleTabs tabsContents={tabsContents} tabNameSelected={tabName} />
    </div>
  );
}
