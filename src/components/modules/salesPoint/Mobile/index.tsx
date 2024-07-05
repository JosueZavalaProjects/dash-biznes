"use client";
import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { SimpleTabs } from "@/components/ui/simpleTabs";
import { TabSelection } from "@/components/ui/tabSelection";

export const SalesPointMobile = () => {
  const { tabsContents, menuNav, tabName, setTabName } = useSalesPointState();

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
};
