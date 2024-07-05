import dayjs from "dayjs";

import Text from "@/components/ui/text";
import { Product as ProductType } from "@/types/salesPoint";

import { Order } from "./order";
import { TabCategories } from "../tabCategories";
import { Total } from "./total";

require("dayjs/locale/es");

type SalesPointProps = {
  products: ProductType[];
  handleClearOrder: () => void;
};

export const SalesPointDesktop = ({
  products,
  handleClearOrder,
}: SalesPointProps) => {
  dayjs.locale("es");

  return (
    <div className="grid py-4 px-8 gap-8 mx-auto xl:max-w-[100rem]">
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
          <Order products={products} />
          <Total handleClearOrder={handleClearOrder} />
        </section>
      </section>
    </div>
  );
};
