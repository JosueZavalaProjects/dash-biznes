import { InventoryProduct } from "@/types/addProduct";

import { ProductData } from "./ProductData";
import { ProductImage } from "./ProductImage";

type ProductDetailsProps = {
  product: InventoryProduct;
  handleShowDeleteModal: () => void;
};

export const ProductDetails = ({
  product,
  handleShowDeleteModal,
}: ProductDetailsProps) => {
  return (
    <section className="flex flex-col-reverse gap-y-8 w-full pt-4 sm:flex-row">
      <ProductData product={product} />
      <ProductImage handleShowDeleteModal={handleShowDeleteModal} />
    </section>
  );
};
