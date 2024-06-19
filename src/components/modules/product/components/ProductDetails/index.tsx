import { ProductData } from "./ProductData";
import { ProductImage } from "./ProductImage";

export const ProductDetails = () => {
  return (
    <section className="flex w-full">
      <ProductData />
      <ProductImage />
    </section>
  );
};
