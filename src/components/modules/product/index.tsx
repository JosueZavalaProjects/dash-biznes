import { ProductDetails } from "./components/ProductDetails";

type ProductProps = {
  productId: string;
};
export const Product = ({ productId }: ProductProps) => {
  return (
    <main className="grid p-6">
      <section className="flex justify-between">
        <div>Titulo</div>
        <div className="flex gap-2">
          <div>Boton 1</div>
          <div>Boton 2</div>
        </div>
      </section>
      <div>Tabs </div>
      <ProductDetails />
      <div>Locaciones en existencia </div>
      Aqui esta el id: {productId}
    </main>
  );
};
