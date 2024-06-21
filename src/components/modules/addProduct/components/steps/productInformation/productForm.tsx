import { ContainerCard } from "@/components/ui/containerCard";
import { Input, KeyValueTypes } from "@/components/ui/input";
import { SelectType } from "@/components/ui/select/selectType/selectType";
import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import { PRODUCT_KEYS } from "@/constants/addProduct";
import { Product, Unit, UnitsObject } from "@/types/addProduct";

type ProductFormProps = {
  product: Product;
  handleSetValueProduct: (value: string, key?: KeyValueTypes) => void;
  handleAddButton: () => void;
  isValidForm: boolean;
  buttonText?: string;
  cancelButton?: boolean;
  cancelAction?: () => void;
};

export const ProductForm = ({
  product,
  handleSetValueProduct,
  handleAddButton,
  isValidForm,
  buttonText,
  cancelButton,
  cancelAction,
}: ProductFormProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    handleSetValueProduct(UnitsObject[e.target.value], PRODUCT_KEYS.UNIT);
  };

  return (
    <ContainerCard>
      <div className="flex flex-col gap-6 p-4">
        <Input
          label="nombre de producto"
          placeholder="Nombra tu producto"
          value={product[PRODUCT_KEYS.NAME]}
          keyValue={PRODUCT_KEYS.NAME}
          setValue={handleSetValueProduct}
        />
        <Input
          label="Cantidad"
          placeholder="Ingresa la cantidad del producto"
          value={product[PRODUCT_KEYS.AMOUNT]}
          keyValue={PRODUCT_KEYS.AMOUNT}
          setValue={handleSetValueProduct}
          type="number"
        />
        <SelectType handleChange={handleChange} />
        <Input
          label="precio de compra"
          placeholder="$"
          value={product[PRODUCT_KEYS.PURCHASE_PRICE]}
          keyValue={PRODUCT_KEYS.PURCHASE_PRICE}
          setValue={handleSetValueProduct}
          type="number"
        />
        <Input
          label="Categoria"
          placeholder="Categoria de producto"
          value={product[PRODUCT_KEYS.CATEGORY]}
          keyValue={PRODUCT_KEYS.CATEGORY}
          setValue={handleSetValueProduct}
        />
        <Input
          label="tipo de producto"
          placeholder="Tipo de talla"
          value={product[PRODUCT_KEYS.TYPE]}
          keyValue={PRODUCT_KEYS.TYPE}
          setValue={handleSetValueProduct}
        />
        <Input
          label="precio de venta"
          placeholder="$"
          value={product[PRODUCT_KEYS.PRICE]}
          keyValue={PRODUCT_KEYS.PRICE}
          setValue={handleSetValueProduct}
          type="number"
        />
        <div className="flex justify-center pt-4 gap-4">
          <SimpleButton
            className="!py-4 !px-8"
            onClick={handleAddButton}
            disabled={!isValidForm}
          >
            {buttonText || "Agregar"}
          </SimpleButton>
          {cancelButton && (
            <SimpleButton
              bgColor="negative"
              className="!py-4 !px-8"
              onClick={cancelAction}
            >
              Cancelar
            </SimpleButton>
          )}
        </div>
      </div>
    </ContainerCard>
  );
};
