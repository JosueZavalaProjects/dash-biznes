"use client";
import { SimpleTabs } from "@/components/ui/simpleTabs";
import { TabSelection } from "@/components/ui/tabSelection";

import useActivitiesState from "./states/activities-state";
import { useSales } from "@/hooks/useSales";
import { useEffect } from "react";

export default function Activities() {
  const { tabsContents, menuNav, tabName, setTabName } = useActivitiesState();
  const { GetSalesByDate } = useSales();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target.value);
  };

  const handleGetSalesByDate = async () => {
    const result = await GetSalesByDate();
    console.log(result);
  };

  useEffect(() => {
    handleGetSalesByDate();
  }, []);

  return (
    <div className="grid">
      <TabSelection
        navItems={menuNav}
        tabName={tabName}
        setTabName={setTabName}
      />
      <div className="flex pt-4 w-full justify-end">
        <div className="w-40">
          <select
            name="selectedFruit"
            onChange={(e) => {
              handleChange(e);
            }}
            className="text-gray-500 p-2 w-full rounded-3xl border border-white bg-gray-100 focus:outline-none"
          >
            <option value={"current"}>Mes actual</option>
            <option value={"january"}>Enero</option>
            <option value={"february"}>Febrero</option>
            <option value={"august"}>Agosto</option>
            <option value={"december"}>Diciembre</option>
          </select>
        </div>
      </div>
      <SimpleTabs tabsContents={tabsContents} tabNameSelected={tabName} />
    </div>
  );
}
