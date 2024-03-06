import Link from "next/link";

import Modal from "../ui/modal";
import { SimpleButton } from "../ui/simpleButton";
import Text from "../ui/text";

type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const AddModal = ({ show, setShow }: ModalProps) => {
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <div className="grid py-12">
        <div className="grid gap-4 justify-items-center">
          <Text size="2xl" color="gray">
            ¿Qué Necesitas Agregar?
          </Text>
          <Link href={"#"} className="cursor-pointer">
            <SimpleButton onClick={() => setShow(false)}>Ventas</SimpleButton>
          </Link>
          <Link href={"/inventory"}>
            <SimpleButton onClick={() => setShow(false)}>
              Inventarios
            </SimpleButton>
          </Link>
          <Link href={"#"}>
            <SimpleButton onClick={() => setShow(false)}>Gastos</SimpleButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
