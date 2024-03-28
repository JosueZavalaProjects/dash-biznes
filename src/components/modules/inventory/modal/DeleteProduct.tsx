import { Loading } from "@/components/modals/components/Loading";
import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";

type DeleteProductModalProps = {
  isLoading: boolean;
  deleteProduct: () => Promise<void>;
  closeModal: () => void;
};
export const DeleteProductModal = ({
  isLoading,
  deleteProduct,
  closeModal,
}: DeleteProductModalProps) => {
  return (
    <div className="grid gap-4 px-4">
      {isLoading && (
        <div className="flex justify-center">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <>
          <Text>¿Estas segur@ que quieres eliminar este producto?</Text>
          <div className="grid gap-4 px-12">
            <SimpleButton onClick={deleteProduct}>Si</SimpleButton>
            <SimpleButton onClick={closeModal}>
              No, regresar al tablero
            </SimpleButton>
          </div>
        </>
      )}
    </div>
  );
};
