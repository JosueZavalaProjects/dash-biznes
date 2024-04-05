import { create, useStore } from "zustand";

import {
  ACTIVITIES_NAV,
  CONTENTS,
  TAB_KEYS,
} from "@/constants/activities/purchases";
import { NavOptions, TabContent } from "@/types/UI/common";
import { SalesTable } from "../sales";
import { PurchasesTable } from "../expenses";

/* import { SalesTable } from "../sales";
import { PurchasesTable } from "../expenses"; */

/* const TAB_KEYS = {
  SALES: "sales",
  EXPENSES: "purchases",
};

const ACTIVITIES_NAV: NavOptions[] = [
  { label: "Ventas", name: TAB_KEYS.SALES },
  { label: "Gastos", name: TAB_KEYS.EXPENSES },
];

const CONTENTS: TabContent = {
  [TAB_KEYS.SALES]: <SalesTable />,
  [TAB_KEYS.EXPENSES]: <PurchasesTable />,
}; */

type InitialState = {
  tabName: string;
  menuNav: NavOptions[];
  tabsContents: TabContent;
  /* startDate: string;
  endDate: string; */
};

type ActivitiesStateProps = InitialState & {
  setTabName: (tabName: string) => void;
  /* setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void; */
};

const INITIAL_STATE: InitialState = {
  tabName: TAB_KEYS.SALES,
  menuNav: ACTIVITIES_NAV,
  /* startDate: "1990-01-01",
  endDate: "1990-01-31", */
  tabsContents: CONTENTS,
};

const ActivitiesStore = create<ActivitiesStateProps>((set) => ({
  tabName: TAB_KEYS.SALES,
  menuNav: ACTIVITIES_NAV,
  tabsContents: CONTENTS,
  /* startDate: "1990-01-01",
  endDate: "1990-01-31", */
  setTabName: (tabName: string) => set({ tabName }),
  /* setStartDate: (startDate: string) => set({ startDate }),
  setEndDate: (endDate: string) => set({ endDate }), */
}));

const useActivitiesState = () => useStore(ActivitiesStore);

export default useActivitiesState;
