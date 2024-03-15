"use client";
import { useEffect, useState } from "react";

import { ContainerCard } from "@/components/ui/containerCard";
import { Input, KeyValueTypes } from "@/components/ui/input";
import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";
import {
  EXPENSES_KEYS,
  EXPENSES_TYPES_KEYS,
  EXPENSES_TYPES_LABELS,
  MOCK_EXPENSE,
} from "@/constants/addExpense";
import { useExpenses } from "@/hooks/useExpenses";
import { Expense } from "@/types/addExpense";
import { ModalType } from "@/types/UI/common";
import { RequestModal } from "@/components/modals/RequestModal";

export const AddExpense = () => {
  const [expense, setExpense] = useState<Expense>(MOCK_EXPENSE);
  const [isValidForm, setIsValidForm] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("false");
  const [modalType, setModalType] = useState<ModalType>();
  const { addExpense } = useExpenses();

  const handleSetValueExpense = (value: string, key?: KeyValueTypes) => {
    const keyValue = key || "name";
    handleSetExpense(value, keyValue);
  };

  const handleSetExpense = (value: string | number, key: KeyValueTypes) => {
    if (key === EXPENSES_KEYS.AMOUNT) value = +value;

    const newProduct = { ...expense, [key]: value };

    setExpense(newProduct);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newType = e.target.value;
    handleSetExpense(newType, "type");
  };

  const handleAddExpense = async () => {
    try {
      setModalType("loading");
      setShowModal(true);
      const response = await addExpense(expense);

      if (response.id) setModalType("success");
    } catch (error: any) {
      setErrorMessage(error?.message);
      setModalType("error");
    }
  };

  useEffect(() => {
    const { amount, type, name } = expense;
    if (amount && type && name) {
      setIsValidForm(true);
      return;
    }
    setIsValidForm(false);
  }, [expense]);

  return (
    <section className="h-[41rem]">
      <RequestModal
        show={showModal}
        setShow={setShowModal}
        modalType={modalType}
        successMessage="¡Listo! Gasto Agregado"
        errorMessage={errorMessage}
      />
      <div className="grid w-full gap-4 px-4 bg-main-blue rounded-lg">
        <div className="flex w-full justify-between bg-main-blue">
          <div className="flex text-center pt-4">
            <Text color="white" size="xl">
              Agrega la informacion del Gasto o Servicio
            </Text>
          </div>
          <div className="grid justify-items-center items-center">
            {/* Here comes Notification bell icon */}
          </div>
        </div>
        <div className="flex gap-4 pb-28 static"></div>
      </div>

      <div className="flex sm:w-[440px] justify-center bg-white rounded-lg relative -top-24 -right-[10px] mx-auto">
        <ContainerCard>
          <div className="flex flex-col gap-2 p-4">
            <Input
              label="Nombre"
              placeholder="Nombre del Gasto"
              value={expense[EXPENSES_KEYS.NAME]}
              keyValue={EXPENSES_KEYS.NAME}
              setValue={handleSetValueExpense}
            />
            <div className="grid gap-2">
              <Text color="gray" className="capitalize">
                Tipo de Gasto
              </Text>
              <select
                name="selectedFruit"
                onChange={(e) => {
                  handleChange(e);
                }}
                className="text-gray-800 p-4 rounded-xl w-full border border-light-gray focus:outline-none"
              >
                {Object.values(EXPENSES_TYPES_KEYS).map((element, key) => {
                  return (
                    <option key={`option_expense_${key}`} value={element}>
                      {EXPENSES_TYPES_LABELS[element]}
                    </option>
                  );
                })}
              </select>
            </div>
            <Input
              label="Monto de Gasto"
              placeholder="$"
              value={expense[EXPENSES_KEYS.AMOUNT]}
              keyValue={EXPENSES_KEYS.AMOUNT}
              setValue={handleSetValueExpense}
              type="number"
            />
            <div className="flex justify-center pt-4">
              <SimpleButton
                className="!py-4 !px-8"
                onClick={() => handleAddExpense()}
                disabled={!isValidForm}
              >
                Agregar
              </SimpleButton>
            </div>
          </div>
        </ContainerCard>
      </div>
    </section>
  );
};
