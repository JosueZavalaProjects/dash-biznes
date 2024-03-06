import { useEffect, useState } from "react";

import Image from "next/image";

import { ContainerCard } from "@/components/ui/containerCard";
import { Input } from "@/components/ui/input";
import SearchInput from "@/components/ui/searchInput";
import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import { PRODUCT_KEYS } from "@/constants/add-product";
import { Product, ProductKeys } from "@/types/add-product";

import { BackArrow } from "../../../../../../../public/assets";

type ProductInformationProps = {
  setStep: (nextStep: number) => void;
  handleSetProduct: (value: string, key: ProductKeys) => void;
  setShowModal: (show: boolean) => void;
  product: Product;
};

export const ProductInformation = ({
  setStep,
  handleSetProduct,
  setShowModal,
  product,
}: ProductInformationProps) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isValidForm, setIsValidForm] = useState<boolean>(false);

  const handleSetValueProduct = (value: string, key?: ProductKeys) => {
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
      <div className="grid w-full gap-4 px-4 bg-main-blue rounded-b-lg">
        <div className="flex w-full justify-between bg-main-blue">
          <div className="w-[245px]">
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

      <div className="flex w-[340px] justify-center bg-white rounded-lg relative -top-24 -right-[10px]">
        <ContainerCard>
          <div className="flex flex-col gap-2 p-4">
            <div className="">
              <SearchInput value={searchInput} setValue={setSearchInput} />
            </div>
            <Input
              label="category"
              placeholder="Ropa"
              value={product[PRODUCT_KEYS.CATEGORY]}
              keyValue={PRODUCT_KEYS.CATEGORY}
              setValue={handleSetValueProduct}
            />
            <Input
              label="tipo de producto"
              placeholder="Playera M"
              value={product[PRODUCT_KEYS.TYPE]}
              keyValue={PRODUCT_KEYS.TYPE}
              setValue={handleSetValueProduct}
            />
            <Input
              label="nombre de producto"
              placeholder="Playera de Barbie"
              value={product[PRODUCT_KEYS.NAME]}
              keyValue={PRODUCT_KEYS.NAME}
              setValue={handleSetValueProduct}
            />
            <Input
              label="precio de venta"
              placeholder="598 MXN"
              value={product[PRODUCT_KEYS.PRICE]}
              keyValue={PRODUCT_KEYS.PRICE}
              setValue={handleSetValueProduct}
              type="number"
            />
            <div className="flex justify-center pt-4">
              <SimpleButton
                className="!py-4 !px-8"
                onClick={() => setShowModal(true)}
                disabled={!isValidForm}
              >
                Agregar
              </SimpleButton>
            </div>
          </div>
        </ContainerCard>
      </div>
    </section>
  );
};
