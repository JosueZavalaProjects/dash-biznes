import { Product } from "@/components/modules/product";

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Product productId={params.id} />
    </>
  );
}
