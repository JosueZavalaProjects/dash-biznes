import { useEffect, useState } from "react";

import Image from "next/image";

import { KeyValueTypes } from "@/components/ui/input";
import Text from "@/components/ui/text";
import { Product } from "@/types/addProduct";

import { BackArrow } from "../../../../../../../public/assets";
import { ProductForm } from "./productForm";

type ProductInformationProps = {
  setStep: (nextStep: number) => void;
  handleSetProduct: (value: string, key: KeyValueTypes) => void;
  setShowModal: (show: boolean) => void;
  product: Product;
};

export const ProductInformation = ({
  setStep,
  handleSetProduct,
  setShowModal,
  product,
}: ProductInformationProps) => {
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleSetValueProduct = (value: string, key?: KeyValueTypes) => {
    const keyValue = key || "name";
    handleSetProduct(value, keyValue);
  };

  useEffect(() => {
    const { category, type, name, price } = product;
    if (category && type && name && price) {
      setIsValidForm(true);
      return;
    }
    setIsValidForm(false);
  }, [product]);

  return (
    <section className="h-[41rem]">
      <div className="grid w-full gap-4 px-4 bg-main-blue rounded-lg">
        <div className="flex w-full justify-between bg-main-blue">
          <div className="flex text-center pt-4">
            <Text color="white" size="xl">
              Agrega la informacion del producto o Servicio
            </Text>
          </div>
          <div className="grid justify-items-center items-center">
            {/* Here comes Notification bell icon */}
          </div>
        </div>
        <div className="flex gap-4 pb-28 static">
          <Image
            src={BackArrow}
            width={15}
            height={26}
            alt="back arrow"
            className="cursor-pointer"
            onClick={() => setStep(1)}
          />
        </div>
      </div>

      <div className="flex sm:w-[440px] justify-center bg-white rounded-lg relative -top-24 -right-[10px] mx-auto">
        <ProductForm
          product={product}
          handleSetValueProduct={handleSetValueProduct}
          handleAddButton={() => setShowModal(true)}
          isValidForm={isValidForm}
        />
      </div>
    </section>
  );
};
