import { ProductProps } from "../..";
import { ProductData } from "./ProductData";
import { ProductImage } from "./ProductImage";

export const ProductDetails = ({ product }: ProductProps) => {
  return (
    <section className="flex w-full">
      <ProductData product={product} />
      <ProductImage />
    </section>
  );
};
