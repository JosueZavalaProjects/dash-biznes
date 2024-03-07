"use client";
import { SimpleTabs } from "@/components/ui/simpleTabs";
import { TabSelection } from "@/components/ui/tabSelection";

import useActivitiesState from "./states/activities-state";

export default function Activities() {
  const { tabsContents, menuNav, tabName, setTabName } = useActivitiesState();

  return (
    <div className="grid">
      <TabSelection
        navItems={menuNav}
        tabName={tabName}
        setTabName={setTabName}
      />
      <SimpleTabs tabsContents={tabsContents} tabNameSelected={tabName} />
    </div>
  );
}
