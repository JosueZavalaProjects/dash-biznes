import { useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import { Activites } from "@/types/activities";

import { ActivitesTables } from "./ActivitiesTables";
import { ActivityOption } from "./components/ActivityOption";

export const ActivitiesMobile = () => {
  const [activitySeleted, setActivitySelected] = useState<Activites>(
    Activites.sales
  );
  return (
    <div className="flex flex-col gap-4">
      <ContainerCard>
        <div className="grid grid-cols-2 sm:grid-cols-4 justify-items-center p-2 w-full">
          <ActivityOption
            text="Ventas"
            activity={Activites.sales}
            handleOnClick={setActivitySelected}
            isSelected={activitySeleted === Activites.sales}
          />
          <ActivityOption
            text="Utilidades"
            activity={Activites.utilites}
            handleOnClick={setActivitySelected}
            isSelected={activitySeleted === Activites.utilites}
          />
          <ActivityOption
            text="Inventarios"
            activity={Activites.inventory}
            handleOnClick={setActivitySelected}
            isSelected={activitySeleted === Activites.inventory}
          />
          <ActivityOption
            text="Gastos"
            activity={Activites.expenses}
            handleOnClick={setActivitySelected}
            isSelected={activitySeleted === Activites.expenses}
          />
        </div>
      </ContainerCard>
      <ActivitesTables acitivitySelected={activitySeleted} />
    </div>
  );
};
