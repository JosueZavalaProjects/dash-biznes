import { ExpensesKeys } from "@/types/addExpense";
import { ProductKeys } from "@/types/addProduct";

import Text from "../ui/text";

export type KeyValueTypes = ProductKeys;

type InputProps = {
  label: string;
  placeholder?: string;
  value: string | number | undefined;
  keyValue?: KeyValueTypes;
  setValue: (newValue: string, keyValue: KeyValueTypes) => void;
  type?: "text" | "number";
};

export const Input = ({
  label,
  placeholder,
  value,
  keyValue = "name",
  setValue,
  type,
}: InputProps) => {
  return (
    <div>
      <div className="grid gap-2">
        <Text color="gray" className="capitalize">
          {label}
        </Text>
        <div className="flex h-auto w-full bg-white text-black border border-light-gray rounded-xl text-lg focus-within:border-france-blue">
          <div className="flex-1">
            <input
              type={type || "text"}
              className="w-full bg-transparent py-2 pl-3 pr-1 border-none text-center focus:border-none focus:outline-0 focus:ring-0"
              placeholder={placeholder || ""}
              value={value || ""}
              onChange={(e) => setValue(e.target.value, keyValue)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
