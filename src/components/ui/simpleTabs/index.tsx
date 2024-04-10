import { ReactNode } from "react";

import { TabPanel } from "./tabs";

type SimpleTabsComponentProps = {
  tabsContents: { [key: string]: any | ReactNode };
  initialActiveTab?: number;
  tabNameSelected: string;
};

export const SimpleTabs = ({
  tabsContents,
  tabNameSelected,
}: SimpleTabsComponentProps) => {
  return Object.keys(tabsContents).map((key, index) => (
    <TabPanel
      key={`tab_${key}_${index}`}
      tabName={key}
      className="w-full pt-4 transition-all transform overflow-hidden"
      activeClassName="opacity-100 duration-500 translate-y-0"
      inactiveClassName="absolute opacity-0 hidden -translate-y-6"
      tabNameSelected={tabNameSelected}
    >
      {tabsContents[key]}
    </TabPanel>
  ));
};
