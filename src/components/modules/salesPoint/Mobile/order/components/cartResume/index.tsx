import Image from "next/image";

import useSalesPointState from "@/components/modules/salesPoint/states/sales-point-state";
import { formatCurrency } from "@/utils/common";

import { CartIcon } from "../../../../../../../../public/assets";

export const CartResume = () => {
  const { products, total } = useSalesPointState();
  return (
    <>
      {Boolean(products.length) && (
        <div className="flex flex-col sm:flex-row justify-between w-full bg-gradient-to-r from-main-blue to-light-blue text-white py-4 px-8 rounded-2xl">
          <div className="flex justify-center gap-4">
            <span className="flex justify-center">
              <Image src={CartIcon} alt="icon" />
            </span>
            <span className="flex justify-center text-2xl">
              {products.length} Productos
            </span>
          </div>
          <div>
            <span className="flex justify-center text-2xl">
              Total: {formatCurrency(total)}
            </span>
          </div>
        </div>
      )}
    </>
  );
};
