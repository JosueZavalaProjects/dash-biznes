import { FaTrash } from "react-icons/fa";

import Image from "next/image";

import { MaggiImage } from "../../../../../../public/assets";

type ProductImageProps = {
  handleShowDeleteModal: () => void;
};

export const ProductImage = ({ handleShowDeleteModal }: ProductImageProps) => {
  return (
    <section className="flex flex-col gap-16 sm:items-end sm:w-1/2 sm:pr-8">
      <section className="grid justify-items-center items-center sm:w-1/2">
        <span className="grid justify-items-center items-center p-4 border-dashed border-2 border-secondary-gray">
          <span className="w-[150px] h-[150px]"></span>
          {/* TODO: Add Imagen */}
          {/* <Image
            src={MaggiImage}
            alt="product image"
            width={150}
            height={150}
          /> */}
        </span>
      </section>
      <section className="flex flex-col gap-4 sm:w-1/2">
        <InformationCard title="Existencias Iniciales" data="30" />
        <InformationCard title="Inventario Restante" data="34" />
        <InformationCard title="En Camino" data="15" />
        <InformationCard title="Precio de Venta" data="12" />
      </section>
      <section className="flex flex-col items-center gap-4 sm:w-1/2">
        <span
          onClick={() => handleShowDeleteModal()}
          className="flex content-center items-center gap-2 text-main-red cursor-pointer"
        >
          <FaTrash /> Borrar Producto
        </span>
      </section>
    </section>
  );
};

export type InformationCardProps = {
  title: string;
  data: string;
};
const InformationCard = ({ title, data }: InformationCardProps) => {
  return (
    <div className="flex w-full justify-between">
      <span className="text-lg text-cadet-grey">{title}</span>
      <span>{data}</span>
    </div>
  );
};
