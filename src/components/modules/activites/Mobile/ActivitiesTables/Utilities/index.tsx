import { useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import { LabelText, TimeOption, colorLabel } from "@/types/activities";

import { SummaryLabel } from "../../components/SummaryLabel";
import { TimeOptions } from "../../components/TimeOptions";

export const UtilitiesActivity = () => {
  const [timeOptionSelected, setTimeOptionSelected] = useState<TimeOption>(
    TimeOption.day
  );
  return (
    <ContainerCard>
      <div className="flex flex-col text-center text-2xl gap-6">
        <div className="text-main-blue font-bold">Utilidades del día</div>
        <TimeOptions
          timeOptionSelected={timeOptionSelected}
          setTimeOptionSelected={setTimeOptionSelected}
        />
        <SummaryLabel
          text={`Utilidades ${LabelText[timeOptionSelected]}`}
          color={colorLabel.blue}
          amount={3000}
        />
        <div>Tabla</div>
      </div>
    </ContainerCard>
  );
};
