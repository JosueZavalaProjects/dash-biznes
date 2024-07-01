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
    <section className="flex w-full pt-4">
      <ProductData product={product} />
      <ProductImage handleShowDeleteModal={handleShowDeleteModal} />
    </section>
  );
};
