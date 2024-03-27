import Text from "@/components/ui/text";
import { Product, ProductKeys } from "@/types/addProduct";

import { ProductForm } from "../../addProduct/components/steps/productInformation/productForm";
import { Loading } from "@/components/modals/components/Loading";

type EditProductProps = {
  product: Product;
  handleSetValueProduct: (value: string | number, key?: ProductKeys) => void;
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
        <div className="flex sm:w-[440px] justify-center bg-white rounded-lg mx-auto py-8">
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
