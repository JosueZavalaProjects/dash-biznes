import { useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";

export const InventoryActivity = () => {
  return (
    <ContainerCard>
      <div className="flex flex-col text-center text-2xl gap-2">
        <div className="text-main-blue font-bold">Inventario</div>
        <div>Inventarios</div>
        <div>Tabla</div>
      </div>
    </ContainerCard>
  );
};
