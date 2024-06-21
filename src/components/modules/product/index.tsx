import { Product as ProductType } from "@/types/inventory";

import { ProductDetails } from "./components/ProductDetails";

type ProductProps = {
  product: ProductType;
};

export const Product = ({ product }: ProductProps) => {
  const { id, name, category, subcategory, price, inventory } = product;
  return (
    <main className="grid p-6">
      <section className="flex justify-between">
        <div className="text-3xl">{name}</div>
        <div className="flex gap-2">
          <div>Boton 1</div>
          <div>Boton 2</div>
        </div>
      </section>
      <div>Tabs </div>
      <ProductDetails />
      <div>Locaciones en existencia </div>
    </main>
  );
};
