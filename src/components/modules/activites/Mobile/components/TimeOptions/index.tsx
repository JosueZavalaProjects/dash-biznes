import { TimeOption } from "@/types/activities";

import { TimeOptionButton } from "./TimeOptionButton";

type TimeOptionsProps = {
  timeOptionSelected: TimeOption;
  setTimeOptionSelected: (option: TimeOption) => void;
};

export const TimeOptions = ({
  timeOptionSelected,
  setTimeOptionSelected,
}: TimeOptionsProps) => {
  const timeOptions: { label: string; value: TimeOption }[] = [
    { label: "Día", value: TimeOption.day },
    { label: "Semana", value: TimeOption.week },
    { label: "Mes", value: TimeOption.month },
    { label: "Año", value: TimeOption.year },
  ];

  return (
    <div className="grid grid-cols-2 justify-items-center gap-4 sm:grid-cols-4">
      {timeOptions.map((option) => {
        return (
          <TimeOptionButton
            key={`timeOption_${option.value}`}
            text={option.label}
            value={option.value}
            isSelected={timeOptionSelected === option.value}
            handleOnClick={setTimeOptionSelected}
          />
        );
      })}
    </div>
  );
};
