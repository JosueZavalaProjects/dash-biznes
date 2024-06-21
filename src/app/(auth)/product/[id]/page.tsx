import { Product } from "@/components/modules/product";
import { Product as ProductType } from "@/types/inventory";

export default function ProductPage({ params }: { params: { id: string } }) {
  const MOCK_PRODUCT: ProductType = {
    id: "1325456453",
    name: "Maggi",
    category: "Comida",
    subcategory: "Condimentos",
    price: 35,
    inventory: 220,
    dateAdded: "",
  };

  return (
    <>
      <Product product={MOCK_PRODUCT} />
    </>
  );
}
