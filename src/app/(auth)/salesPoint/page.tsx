"use client";
import { Order } from "@/components/modules/salesPoint/order";
import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { Total } from "@/components/modules/salesPoint/total";
import { SimpleTabs } from "@/components/ui/simpleTabs";

export default function SalesPointPage() {
  const { tabsContents, menuNav, tabName, setTabName } = useSalesPointState();

  return (
    <div className="grid py-4 px-8 gap-4">
      <section className="grid ">
        <div className="text-2xl">Negocio</div>
        <div className="text-lg">Martes, 9 de Abril 2024</div>
      </section>
      <section className="">Tabs</section>
      <section className="grid">
        <div>Productos</div>
        <section className="flex w-full gap-4">
          <Order />
          <Total />
        </section>
      </section>

      {/* <TabSelection
        navItems={menuNav}
        tabName={tabName}
        setTabName={setTabName}
      />
      <SimpleTabs tabsContents={tabsContents} tabNameSelected={tabName} /> */}
    </div>
  );
}
