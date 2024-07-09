import { useState } from "react";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";

import cn from "classnames";

import { SimpleButton } from "@/components/ui/buttons/simpleButton";
import Text from "@/components/ui/text";

type EditOptionsProps = {
  handleDelete: (id: string) => void;
  handleEdit: (id: string) => void;
  id: string;
};

export const EditOptions = ({
  handleDelete,
  handleEdit,
  id,
}: EditOptionsProps) => {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <div className="flex items-center flex-col pl-4 relative">
      <div
        className="flex justify-center cursor-pointer text-gray-400 text-2xl font-normal rotate-90 text-center"
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
          onClick={() => handleEdit(id)}
          className="!p-3"
        >
          <div className="flex gap-2 items-center">
            <FaEdit /> Editar
          </div>
        </SimpleButton>
        <SimpleButton
          bgColor="gradient-red"
          onClick={() => handleDelete(id)}
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
