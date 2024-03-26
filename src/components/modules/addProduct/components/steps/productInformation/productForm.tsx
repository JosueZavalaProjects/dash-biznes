import { ContainerCard } from "@/components/ui/containerCard";
import { Input } from "@/components/ui/input";
import { SimpleButton } from "@/components/ui/simpleButton";
import { PRODUCT_KEYS } from "@/constants/addProduct";
import { Product, ProductKeys } from "@/types/addProduct";

type ProductFormProps = {
  product: Product;
  handleSetValueProduct: (value: string, key?: ProductKeys) => void;
  handleAddButton: () => void;
  isValidForm: boolean;
};

export const ProductForm = ({
  product,
  handleSetValueProduct,
  handleAddButton,
  isValidForm,
}: ProductFormProps) => {
  return (
    <ContainerCard>
      <div className="flex flex-col gap-2 p-4">
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
          label="nombre de producto"
          placeholder="Nombra tu producto"
          value={product[PRODUCT_KEYS.NAME]}
          keyValue={PRODUCT_KEYS.NAME}
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
        <Input
          label="precio de compra"
          placeholder="$"
          value={product[PRODUCT_KEYS.PURCHASE_PRICE]}
          keyValue={PRODUCT_KEYS.PURCHASE_PRICE}
          setValue={handleSetValueProduct}
          type="number"
        />
        <div className="flex justify-center pt-4">
          <SimpleButton
            className="!py-4 !px-8"
            onClick={handleAddButton}
            disabled={!isValidForm}
          >
            Agregar
          </SimpleButton>
        </div>
      </div>
    </ContainerCard>
  );
};
