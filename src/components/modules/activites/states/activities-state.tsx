import { create, useStore } from "zustand";

import { ACTIVITIES_NAV, CONTENTS, TAB_KEYS } from "@/constants/activities";
import { NavOptions, TabContent } from "@/types/UI/common";

type InitialState = {
  tabName: string;
  menuNav: NavOptions[];
  tabsContents: TabContent;
};

type ActivitiesStateProps = InitialState & {
  setTabName: (tabName: string) => void;
};

const INITIAL_STATE: InitialState = {
  tabName: TAB_KEYS.SALES,
  menuNav: ACTIVITIES_NAV,
  tabsContents: CONTENTS,
};

const ActivitiesStore = create<ActivitiesStateProps>((set) => ({
  tabName: TAB_KEYS.SALES,
  menuNav: ACTIVITIES_NAV,
  tabsContents: CONTENTS,
  setTabName: (tabName: string) => set({ tabName }),
}));

const useActivitiesState = () => useStore(ActivitiesStore);

export default useActivitiesState;
