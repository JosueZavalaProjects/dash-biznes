import { ProductProps } from "../..";
import { InformationCardProps } from "./ProductImage";

export const ProductData = ({ product }: ProductProps) => {
  const { id, name, category, subcategory, price, inventory, dateAdded } =
    product;
  return (
    <section className="flex flex-col w-1/2 gap-12">
      <div className="flex flex-col gap-6">
        <div className="text-xl font-semibold">Detalles Primarios</div>
        <InformationCard title="Nombre del Producto" data={name} />
        <InformationCard title="ID Producto" data={id || "---"} />
        <InformationCard title="Categoria del Producto" data={category} />
        <InformationCard title="Dia de expiracion" data="" />
        <InformationCard title="Precio de compra" data={price.toString()} />
      </div>
      <div className="grid gap-6">
        <div className="text-xl font-semibold">Detalles Primarios</div>
        <InformationCard title="Nombre del Proveedor" data="Juan Martin" />
        <InformationCard title="Contacto" data="12345 67890" />
      </div>
    </section>
  );
};

const InformationCard = ({ title, data }: InformationCardProps) => {
  return (
    <div className="flex w-full">
      <div className="w-1/2 text-cadet-grey">{title}</div>
      <div className="w-1/2">{data || "---"}</div>
    </div>
  );
};
