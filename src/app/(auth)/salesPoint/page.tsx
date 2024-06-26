"use client";
import dayjs from "dayjs";

import { Order } from "@/components/modules/salesPoint/order";
import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { TabCategories } from "@/components/modules/salesPoint/tabCategories";
import { Total } from "@/components/modules/salesPoint/total";
import Text from "@/components/ui/text";

require("dayjs/locale/es");

export default function SalesPointPage() {
  const { tabsContents, menuNav, tabName, setTabName } = useSalesPointState();
  dayjs.locale("es");

  return (
    <div className="grid py-4 px-8 gap-8">
      <section className="grid gap-2">
        <div className="text-2xl">Negocio</div>
        <Text color="dark" size="lg" className="capitalize">
          {dayjs(Date().toString()).format("DD MMMM YYYY")}
        </Text>
      </section>
      <TabCategories />
      <section className="grid gap-4">
        <Text color="dark" size="2xl">
          Productos
        </Text>

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
