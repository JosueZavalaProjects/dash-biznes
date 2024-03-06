import { addDoc, collection } from "firebase/firestore";
import Image from "next/image";

import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import { db } from "@/services/firebase";

import { SuccessIcon } from "../../../../../../public/assets";
import useSalesPointState from "../../../states/sales-point-state";

export const Change = ({ setShow }: { setShow: (show: boolean) => void }) => {
  const { payment, products, total, clearSale } = useSalesPointState();

  const handleAddSaleToDB = async () => {
    await addDoc(collection(db, "sales"), {
      products,
      payment,
      total,
    });
  };

  const handleNextStep = async () => {
    await handleAddSaleToDB();

    clearSale();
    setShow(false);
  };

  return (
    <div className="grid justify-items-center gap-4 text-black">
      <Image src={SuccessIcon} width={108} height={80} alt="success" />
      <Text color="silver" size="2xl">
        El camibio es: {payment - total} MXN
      </Text>
      <div className="text-old-silver"></div>
      <SimpleButton onClick={() => handleNextStep()} className={"px-8 py-4"}>
        Hacer otra Venta
      </SimpleButton>
    </div>
  );
};
