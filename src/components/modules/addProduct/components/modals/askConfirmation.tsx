import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

type AskConfirmationProps = {
  setInventoryStep: (newStep: number) => void;
  handleAddProduct: () => void;
};

export const AskConfirmation = ({
  setInventoryStep,
  handleAddProduct,
}: AskConfirmationProps) => {
  const handleConfirmButtom = () => {
    handleAddProduct();
  };

  return (
    <div className="grid gap-4">
      <Text color="gray" size="xl">
        ¿Estás segur@ que quieres agregar este artículo?
      </Text>
      <div className="flex justify-center">
        <SimpleButton onClick={() => handleConfirmButtom()}>Si</SimpleButton>
      </div>
      <div className="flex justify-center">
        <SimpleButton bgColor="gray" onClick={() => setInventoryStep(1)}>
          No, regresar al tablero
        </SimpleButton>
      </div>
    </div>
  );
};
