import { FaRegTrashAlt } from "react-icons/fa";

import Text from "@/components/ui/text";
import { ProductCheckout } from "@/types/salesPoint";

import useSalesPointState from "../../../states/sales-point-state";

export const TotalTable = ({ products }: { products: ProductCheckout[] }) => {
  return (
    <div className="max-h-96 overflow-y-scroll">
      <table className="w-full text-gray-700">
        <thead>
          <tr className="text-cadet-grey">
            <th className="font-light pb-2">Cant</th>
            <th className="font-light pb-2">Descripción</th>
            <th className="font-light pb-2">P.U.</th>
            <th className="font-light pb-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <RowTable key={`rowTable_${index}`} product={product} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const RowTable = ({ product }: { product: ProductCheckout }) => {
  const { removeProduct } = useSalesPointState();
  return (
    <tr className="text-center border-y">
      <td className="py-4">
        <Text size="2xl" weight="bold">
          {product.amount}
        </Text>
      </td>
      <td className="text-center py-4">{product.name}</td>
      <td className="py-4">{product.price}</td>
      <td className="py-4">{product.amount * product.price}</td>
      <td className="py-4">
        <FaRegTrashAlt
          className="cursor-pointer h-5 w-5"
          onClick={() => removeProduct(product)}
        />
      </td>
    </tr>
  );
};
