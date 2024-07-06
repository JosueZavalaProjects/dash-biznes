import { useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import { LabelText, TimeOption, colorLabel } from "@/types/activities";

import { SummaryLabel } from "../../components/SummaryLabel";
import { TimeOptions } from "../../components/TimeOptions";
import { ExpensesMobileTable } from "./Table";

export const ExpensesActivity = () => {
  const [timeOptionSelected, setTimeOptionSelected] = useState<TimeOption>(
    TimeOption.day
  );
  return (
    <ContainerCard>
      <div className="flex flex-col text-center text-2xl gap-6">
        <div className="text-main-blue font-bold">{`Gastos ${LabelText[timeOptionSelected]}`}</div>
        <TimeOptions
          timeOptionSelected={timeOptionSelected}
          setTimeOptionSelected={setTimeOptionSelected}
        />
        <SummaryLabel
          text={`Gastos ${LabelText[timeOptionSelected]}`}
          color={colorLabel.red}
          amount={3000}
        />
        <ExpensesMobileTable />
      </div>
    </ContainerCard>
  );
};
