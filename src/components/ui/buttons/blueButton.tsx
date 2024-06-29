import Link from "next/link";

import { SimpleButton } from "./simpleButton";

export const BlueAddButton = ({ link }: { link: string }) => {
  return (
    <SimpleButton bgColor="gradient-blue">
      <Link href={link}>
        <div className="flex gap-2 items-center ">
          <span className="grid justify-items-center items-center w-8 h-8 bg-[#E0F4FF] rounded-full border-dashed border-2 border-sky-500 text-sky-500">
            +
          </span>
          Agregar
        </div>
      </Link>
    </SimpleButton>
  );
};
