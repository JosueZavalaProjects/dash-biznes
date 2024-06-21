import { Product } from "@/components/modules/product";
import { Product as ProductType } from "@/types/inventory";

export default function ProductPage({ params }: { params: { id: string } }) {
  const MOCK_PRODUCT: ProductType = {
    id: "",
    name: "Maggi",
    category: "",
    subcategory: "",
    price: 0,
    inventory: 0,
    dateAdded: "",
  };

  return (
    <>
      <Product product={MOCK_PRODUCT} />
    </>
  );
}
