import { useEffect, useState } from "react";

import { Product as ProductType } from "@/types/salesPoint";

import { MinusIcon, PlusIcon } from "../../../../../../public/assets";
import { BlackButton } from "../../order-legacy/components/items/blackButton";
import useSalesPointState from "../../states/sales-point-state";

type ProductCardProps = { product: ProductType };

export const ProductCard = ({ product }: ProductCardProps) => {
  const [showAmount, setShowAmount] = useState(false);
  const [items, setItems] = useState(0);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [inventory, setInventory] = useState(product?.inventory);

  const { updateProduct, removeProduct } = useSalesPointState();

  const toggleShowAmount = () => setShowAmount(!showAmount);

  const handleAddProduct = () => updateProduct({ ...product, amount: items });

  const handleRemoveProduct = () =>
    removeProduct({ ...product, amount: items });

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (items === 0) {
      handleRemoveProduct();
      return;
    }

    handleAddProduct();
  }, [items]);

  return (
    <div className="flex flex-col justify-end max-w-52 h-40 bg-blue-100 rounded-md ">
      <div
        className="bg-cover bg-center w-full h-28 rounded-t-md cursor-pointer"
        style={{
          backgroundImage:
            "url(https://e0.pxfuel.com/wallpapers/79/789/desktop-wallpaper-stunning-mountain-view.jpg)",
        }}
        onClick={() => toggleShowAmount()}
      />
      {!showAmount && (
        <span
          className="grid justify-items-center items-center text-center px-2 text-ellipsis overflow-hidden w-full h-12 bg-gradient-to-b from-seconday-blue to-light-blue rounded-b-md cursor-pointer text-white"
          onClick={() => toggleShowAmount()}
        >
          {product.name}
        </span>
      )}
      {showAmount && (
        <span className="grid justify-items-center items-center w-full h-24 bg-gradient-to-b from-seconday-blue to-main-blue rounded-b-md">
          <div className="flex items-center gap-3">
            <BlackButton
              icon={{ src: MinusIcon, alt: "minus icon" }}
              setItems={() => setItems(items - 1)}
              disabled={items <= 0}
            />
            <div className="grid justify-items-center items-center min-w-16 text-3xl text-white">
              {items}
            </div>
            <BlackButton
              icon={{ src: PlusIcon, alt: "plus icon" }}
              setItems={() => setItems(items + 1)}
              disabled={inventory <= items}
            />
          </div>
        </span>
      )}
    </div>
  );
};
