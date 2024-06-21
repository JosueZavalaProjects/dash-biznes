import { ProductProps } from "../..";

export const ProductData = ({ product }: ProductProps) => {
  const { id, name, category, subcategory, price, inventory, dateAdded } =
    product;
  return (
    <section className="flex flex-col w-1/2 gap-12">
      <div className="flex flex-col gap-6">
        <div className="text-xl font-semibold">Detalles Primarios</div>
        <div className="flex w-full">
          <div className="w-1/2 text-cadet-grey">Nombre del Producto</div>
          <div className="w-1/2">{name}</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 text-cadet-grey">ID Producto</div>
          <div className="w-1/2">{id}</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 text-cadet-grey">Categoria del Producto</div>
          <div className="w-1/2">{category}</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 text-cadet-grey">Dia de expiracion</div>
          <div className="w-1/2">---</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 text-cadet-grey">Precio de compra</div>
          <div className="w-1/2">{price}</div>
        </div>
      </div>
      <div className="grid gap-6">
        <div className="text-xl font-semibold">Detalles Primarios</div>
        <div className="flex w-full">
          <div className="w-1/2 text-cadet-grey">Nombre del Proveedor</div>
          <div className="w-1/2">Juan Martin</div>
        </div>
        <div className="flex w-full">
          <div className="w-1/2 text-cadet-grey">Contacto</div>
          <div className="w-1/2">12345 67890</div>
        </div>
      </div>
    </section>
  );
};
