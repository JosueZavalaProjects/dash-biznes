import { useState } from "react";

import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import { db } from "@/services/firebase";

import useSalesPointState from "../../../states/sales-point-state";

export const PaymentAmount = () => {
  const [inputNumber, setInputNumber] = useState();
  const { setPayment, setPaymentStep, paymentMethod, products, total } =
    useSalesPointState();

  const handleNextStep = async (PaymentAmount: number) => {
    const ticketNumber = await handleGetTicketLasSale();
    await handleAddSaleToDB(ticketNumber, PaymentAmount);

    setPayment(PaymentAmount);
    setPaymentStep(3);
  };

  const salesRef = collection(db, "sales");

  const handleAddSaleToDB = async (
    ticketNumber: number,
    PaymentAmount: number
  ) => {
    let string = JSON.stringify({
      products,
      payment: PaymentAmount,
      total,
      paymentMethod,
      ticket: ticketNumber + 1,
      date: new Date().toString(),
    });
    let newObj = JSON.parse(string);

    await addDoc(salesRef, newObj);
  };

  const handleGetTicketLasSale = async () => {
    let ticketNumber = 0;
    const q = query(salesRef, orderBy("ticket", "desc"), limit(1));

    const qwerySnapshot = await getDocs(q);

    qwerySnapshot.forEach((doc) => {
      ticketNumber = doc.data().ticket;
    });
    return ticketNumber;
  };

  return (
    <div className="grid justify-items-center gap-4 text-black">
      <Text color="silver" size="2xl">
        El cliente pago con:
      </Text>
      <div className="text-old-silver"></div>
      <SimpleButton
        disabled={total > 100}
        onClick={() => handleNextStep(100)}
        className={"px-8 py-4"}
      >
        100 MXN
      </SimpleButton>
      <SimpleButton
        disabled={total > 200}
        onClick={() => handleNextStep(200)}
        className={"px-8 py-4"}
      >
        200 MXN
      </SimpleButton>
      <SimpleButton
        disabled={total > 500}
        onClick={() => handleNextStep(500)}
        className={"px-8 py-4"}
      >
        500 MXN
      </SimpleButton>
      <SimpleButton
        disabled={total > 1000}
        onClick={() => handleNextStep(1000)}
        className={"px-8 py-4"}
      >
        1,000 MXN
      </SimpleButton>
      <div className="flex flex-row justify-stretch items-center w-32 px-2 py-2  text-3xl border border-black rounded-xl overflow-hidden">
        <div className="py-0 pr-2 text-gray-400">$</div>
        <input
          value={inputNumber}
          onChange={(e: any) => setInputNumber(e.target.value)}
          className="flex-1 w-full pl-2 focus:outline-none"
          type="number"
        />
      </div>
      {inputNumber && (
        <div className="pt-4">
          <SimpleButton
            disabled={total > inputNumber}
            onClick={() => handleNextStep(inputNumber)}
            className={"px-8 py-4"}
          >
            Siguiente
          </SimpleButton>
        </div>
      )}
    </div>
  );
};
