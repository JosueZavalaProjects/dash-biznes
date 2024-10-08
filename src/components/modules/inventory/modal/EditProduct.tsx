import { Loading } from "@/components/modals/components/Loading";
import { KeyValueTypes } from "@/components/ui/input";
import Text from "@/components/ui/text";
import { Product } from "@/types/addProduct";

import { ProductForm } from "../../addProduct/components/steps/productInformation/productForm";

type EditProductProps = {
  product: Product;
  handleSetValueProduct: (value: string | number, key?: KeyValueTypes) => void;
  isLoading: boolean;
  updateProduct: () => void;
  handleCancel: () => void;
};

export const EditProduct = ({
  product,
  handleSetValueProduct,
  isLoading = true,
  updateProduct,
  handleCancel,
}: EditProductProps) => {
  const isValidForm = true;

  return (
    <section>
      <div className="">
        <Text size="3xl">Editar Producto</Text>
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div className="flex max-h-[42rem] overflow-y-scroll justify-center bg-white rounded-lg mx-auto py-8 sm:w-[440px]">
          <ProductForm
            product={product}
            handleSetValueProduct={handleSetValueProduct}
            handleAddButton={updateProduct}
            isValidForm={isValidForm}
            buttonText="Actualizar"
            cancelButton={true}
            cancelAction={handleCancel}
          />
        </div>
      )}
    </section>
  );
};
