import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { usePathname } from "next/navigation";

import Modal from "../ui/modal";
import { SimpleButton } from "../ui/simpleButton";
import Text from "../ui/text";

type ModalProps = {
  show: boolean;
  setShow: (show: boolean) => void;
};

export const AddModal = ({ show, setShow }: ModalProps) => {
  const pathname = usePathname();
  const handleSalesPoint = () => {
    deleteCookie("products");
    deleteCookie("saleID");
    setShow(false);
    if (pathname === "/salesPoint") window.location.href = "/salesPoint";
  };
  return (
    <Modal show={show} onClose={() => setShow(false)}>
      <div className="grid py-12">
        <div className="grid gap-4 justify-items-center">
          <Text size="2xl" color="gray">
            ¿Qué Necesitas Agregar?
          </Text>
          <Link href={"/salesPoint"} className="cursor-pointer">
            <SimpleButton onClick={() => handleSalesPoint()}>
              Ventas
            </SimpleButton>
          </Link>
          <Link href={"/addProduct"}>
            <SimpleButton onClick={() => setShow(false)}>Producto</SimpleButton>
          </Link>
          <Link href={"/addExpense"}>
            <SimpleButton onClick={() => setShow(false)}>Gastos</SimpleButton>
          </Link>
        </div>
      </div>
    </Modal>
  );
};
