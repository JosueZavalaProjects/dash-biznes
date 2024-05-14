import { ChangeEvent } from "react";

import { UnitsObject } from "@/types/addProduct";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Text from "../../text";

type SelectTypeProps = {
  handleChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const SelectType = ({ handleChange }: SelectTypeProps) => {
  return (
    <div>
      <div className="grid gap-2">
        <Text color="dark" weight="semibold" className="capitalize">
          Unidad de producto
        </Text>
        <div className="select-container w-full">
          <select
            id="selectedUnit"
            onChange={(e: ChangeEvent<HTMLSelectElement>) => {
              handleChange(e);
            }}
            className="select-box p-3 w-full rounded-xl border text-gray-400 placeholder:text-slate-400 focus:outline-none"
          >
            <option className="text-gray-400" hidden selected>
              Pzs, Kg, Lt
            </option>
            <option value={UnitsObject.pzs}>Piezas</option>
            <option value={UnitsObject.kg}>Kg</option>
            <option value={UnitsObject.lt}>Lt</option>
          </select>
          <div className="icon-container">
            <FontAwesomeIcon
              icon={faCaretDown}
              className="fas fa-caret-down text-gray-400"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
