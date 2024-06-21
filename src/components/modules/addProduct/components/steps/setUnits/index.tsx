"use client";
import Image from "next/image";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";
import { Unit, UnitsObject } from "@/types/addProduct";

import { BackArrow, CameraIcon } from "../../../../../../../public/assets";
import { NumberButton } from "./numbers";

type SetUnitsProps = {
  amount: string;
  unit: Unit;
  setStep: (nextStep: number) => void;
  handleSetAmount: (character: number | string) => void;
  removeDecimalPart: (unit: Unit) => void;
  setUnit: (unit: Unit) => void;
};

export const SetUnits = ({
  amount,
  unit,
  setStep,
  handleSetAmount,
  removeDecimalPart,
  setUnit,
}: SetUnitsProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnit(UnitsObject[e.target.value]);
    removeDecimalPart(UnitsObject[e.target.value]);
  };

  return (
    <div className="grid gap-4 bg-main-blue p-4 mt-6 mx-auto lg:w-[25rem]">
      <div className="flex px-4">
        <div className="flex gap-4">
          <Image
            src={BackArrow}
            width={15}
            height={26}
            alt="back arrow"
            className="cursor-pointer"
          />
        </div>
        <div className="grid justify-items-center items-center w-full">
          <Text color="white" size="4xl" as="h1">
            Inventario
          </Text>
        </div>
      </div>
      <div className="grid gap-4 justify-items-center items-cener py-4">
        <div className="flex flex-col w-full items-center">
          <div className="flex gap-2 w-2/3 justify-center items-end py-2">
            <Text
              color="white"
              size="5xl"
              className="max-w-40 overflow-x-scroll overflow-y-hidden justify-start px-4"
            >
              {amount ? amount : 0}
            </Text>
            <Text color="white" size="sm" className="capitalize w-1/12">
              {unit}
            </Text>
          </div>
          <div className="flex w-full justify-center">
            <select
              name="selectedFruit"
              onChange={(e) => {
                handleChange(e);
              }}
              className="text-white p-2 w-4/12 rounded-3xl border border-white bg-transparent focus:outline-none"
            >
              <option value={UnitsObject.pzs}>Pzas</option>
              <option value={UnitsObject.kg}>Kg</option>
              <option value={UnitsObject.lt}>Lt</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 w-full gap-4 px-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number, index) => (
            <NumberButton
              key={`NumberButton_${index}`}
              handleSetAmount={handleSetAmount}
              character={number}
            />
          ))}
          <NumberButton handleSetAmount={handleSetAmount} character={"."} />
          <NumberButton handleSetAmount={handleSetAmount} character={0} />
          <NumberButton handleSetAmount={handleSetAmount} character={"<"} />
        </div>
        <div className="grid gap-4 justify-items-center items-cener py-4">
          <SimpleButton disabled={Boolean(!amount)} onClick={() => setStep(2)}>
            Agregar
          </SimpleButton>
        </div>
      </div>
    </div>
  );
};
