"use client";
import { useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import { LabelText, TimeOption, colorLabel } from "@/types/activities";

import { SummaryLabel } from "../../components/SummaryLabel";
import { TimeOptions } from "../../components/TimeOptions";
import { SalesActivityTable } from "./Table";

export const SalesActivity = () => {
  const [timeOptionSelected, setTimeOptionSelected] = useState<TimeOption>(
    TimeOption.day
  );

  return (
    <ContainerCard>
      <div className="flex flex-col text-center text-2xl gap-6">
        <div className="text-main-blue font-bold">Ventas del día</div>
        <TimeOptions
          timeOptionSelected={timeOptionSelected}
          setTimeOptionSelected={setTimeOptionSelected}
        />
        <SummaryLabel
          text={`Ventas ${LabelText[timeOptionSelected]}`}
          color={colorLabel.green}
          amount={800}
        />

        <SalesActivityTable />
      </div>
    </ContainerCard>
  );
};
