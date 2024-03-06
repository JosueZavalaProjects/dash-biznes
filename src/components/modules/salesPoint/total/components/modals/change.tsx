import { addDoc, collection, getDocs } from "firebase/firestore";
import { query, orderBy, limit } from "firebase/firestore";
import Image from "next/image";

import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import { db } from "@/services/firebase";

import { SuccessIcon } from "../../../../../../../public/assets";
import useSalesPointState from "../../../states/sales-point-state";

export const Change = ({ setShow }: { setShow: (show: boolean) => void }) => {
  const { payment, products, total, clearSale } = useSalesPointState();
  const salesRef = collection(db, "sales");

  const handleAddSaleToDB = async (ticketNumber: number) => {
    await addDoc(collection(db, "sales"), {
      products,
      payment,
      total,
      ticket: ticketNumber + 1,
      date: new Date().toString(),
    });
  };

  const handleGetTicketLasSale = async () => {
    let ticketNumber = 0;
    const q = query(salesRef, orderBy("ticket", "desc"), limit(1));

    const qwerySnapshot = await getDocs(q);

    qwerySnapshot.forEach((doc) => {
      ticketNumber = doc.data().ticket;
      console.log({ ticketNumber });
    });
    return ticketNumber;
  };

  const handleNextStep = async () => {
    const ticketNumber = await handleGetTicketLasSale();
    await handleAddSaleToDB(ticketNumber);

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
