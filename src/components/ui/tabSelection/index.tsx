import { NavOptions } from "@/types/UI/common";

import { ContainerCard } from "../containerCard";
import { TabSelectionItem } from "./tabSelectionItem";

type TabSelectionProps = {
  navItems: NavOptions[];
  tabName: string;
  setTabName: (tabName: string) => void;
};

export const TabSelection = ({
  navItems,
  tabName,
  setTabName,
}: TabSelectionProps) => {
  return (
    <ContainerCard>
      <nav className="">
        <ul className="flex items-center gap-4">
          {navItems.map((item, index) => (
            <TabSelectionItem
              text={item.label}
              optionName={item.name}
              tabName={tabName}
              setTabName={setTabName}
              key={`TopNavBarItem_${index}`}
            />
          ))}
        </ul>
      </nav>
    </ContainerCard>
  );
};
