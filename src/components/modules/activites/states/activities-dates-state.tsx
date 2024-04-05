import { create, useStore } from "zustand";

type InitialState = {
  startDate: string;
  endDate: string;
};

type ActivitiesDatesStateProps = InitialState & {
  setStartDate: (startDate: string) => void;
  setEndDate: (endDate: string) => void;
};

const INITIAL_STATE: InitialState = {
  startDate: "1990-01-01",
  endDate: "1990-01-31",
};

const ActivitiesDatesStore = create<ActivitiesDatesStateProps>((set) => ({
  startDate: "1990-01-01",
  endDate: "1990-01-31",
  setStartDate: (startDate: string) => set({ startDate }),
  setEndDate: (endDate: string) => set({ endDate }),
}));

const useActivitiesDateState = () => useStore(ActivitiesDatesStore);

export default useActivitiesDateState;
