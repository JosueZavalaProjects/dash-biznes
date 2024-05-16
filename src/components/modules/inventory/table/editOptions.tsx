import { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import cn from "classnames";

import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";

type EditOptionsProps = {
  handleDeleteProduct: (id: string) => void;
  handleEditProduct: (id: string) => void;
  id: string;
};

export const EditOptions = ({
  handleDeleteProduct,
  handleEditProduct,
  id,
}: EditOptionsProps) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="flex items-start flex-col w-8 h-12 relative">
      <div
        className="flex items-start cursor-pointer text-gray-400 text-2xl font-normal"
        onClick={() => setShowOptions(!showOptions)}
      >
        ...
      </div>
      <div
        className={cn(
          "fixed w-screen h-screen bg-slate-200/[.07] z-10 top-0 left-0",
          {
            flex: showOptions,
            hidden: !showOptions,
          }
        )}
        onClick={() => setShowOptions(false)}
      />
      <div
        className={cn(
          "absolute flex-col right-10 gap-2 top-2 border rounded-lg p-4 bg-white z-20",
          {
            flex: showOptions,
            hidden: !showOptions,
          }
        )}
      >
        <SimpleButton
          bgColor="gradient-blue"
          onClick={() => handleEditProduct(id)}
          className="!p-3"
        >
          <div className="flex gap-2 items-center">
            <FaEdit /> Editar
          </div>
        </SimpleButton>
        <SimpleButton
          bgColor="gradient-red"
          onClick={() => handleDeleteProduct(id)}
          className="!p-3"
        >
          <div className="flex gap-2 items-center">
            <FaRegTrashAlt /> Eliminar
          </div>
        </SimpleButton>
      </div>
    </div>
  );
};
