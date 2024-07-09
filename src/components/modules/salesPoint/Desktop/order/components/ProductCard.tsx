import { useEffect, useState } from "react";

import { BG_COLORS } from "@/constants/salesPoint";
import {
  ProductCardsProps,
  ProductCheckout,
  Product as ProductType,
} from "@/types/salesPoint";

import { MinusIcon, PlusIcon } from "../../../../../../../public/assets";
import { BlackButton } from "../../../Mobile/order/components/items/blackButton";
import useSalesPointState from "../../../states/sales-point-state";

type ProductCardProps = {
  product: ProductCardsProps;
  /* cartProduct: ProductCheckout; */
  index?: number;
  /* productCardsProps: ProductCardsProps; */
  handleSetShowAmount: (id: string, value: boolean) => void;
  handleSetItems: (id: string, value: number) => void;
};

export const ProductCard = ({
  product,
  index = 0,
  /* cartProduct, */
  /* productCardsProps, */
  handleSetShowAmount,
  handleSetItems,
}: ProductCardProps) => {
  /* const [showAmount, setShowAmount] = useState(false);
  const [items, setItems] = useState(0); */
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [inventory, setInventory] = useState(product?.inventory);

  const {
    updateProduct,
    removeProduct,
    products: cartProducts,
  } = useSalesPointState();

  const toggleShowAmount = () =>
    handleSetShowAmount(product.id, !product.showAmount);

  const handleAddProduct = () =>
    updateProduct({ ...product, amount: product.amount });

  const handleRemoveProduct = () =>
    removeProduct({ ...product, amount: product.amount });

  const handleSetInitialCard = () => {
    setInventory(product.inventory);
    handleSetShowAmount(product.id, false);
    handleSetItems(product.id, 0);
  };

  useEffect(() => {
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    if (product.amount === 0) {
      handleRemoveProduct();
      return;
    }

    handleAddProduct();
  }, [product.amount]);

  useEffect(() => {
    handleSetInitialCard();
  }, [product.inventory]);

  useEffect(() => {
    if (!cartProducts) return;

    const productInCart = cartProducts.find(
      (productCart) => productCart.id === product.id
    );
    if (!productInCart) {
      handleSetInitialCard();
    }
  }, [cartProducts]);

  return (
    <div className="flex flex-col max-w-52 h-52 rounded-22xl">
      <div
        className={`bg-cover bg-center w-full h-36 rounded-t-2xl cursor-pointer ${
          BG_COLORS[index % BG_COLORS.length]
        } ${product.showAmount && "opacity-60"}`}
        /* 
        TODO: Implement this when save images in firebase
        style={{
          backgroundImage:
            "url(https://e0.pxfuel.com/wallpapers/79/789/desktop-wallpaper-stunning-mountain-view.jpg)",
        }} */
        onClick={() => toggleShowAmount()}
      />
      {!product.showAmount && (
        <span
          className="grid justify-items-center items-center text-center px-2 text-xl font-semibold text-ellipsis overflow-hidden w-full h-16 bg-gradient-to-b from-seconday-blue to-light-blue rounded-b-2xl cursor-pointer text-white"
          onClick={() => toggleShowAmount()}
        >
          {product.name}
        </span>
      )}
      {product.showAmount && (
        <span className="grid justify-items-center items-center w-full h-28 bg-gradient-to-b from-seconday-blue to-main-blue rounded-b-2xl">
          <div className="flex items-center gap-3">
            <BlackButton
              icon={{ src: MinusIcon, alt: "minus icon" }}
              setItems={() => handleSetItems(product.id, product.amount - 1)}
              disabled={product.amount <= 0}
            />
            <div className="grid justify-items-center items-center min-w-16 text-3xl text-white">
              {product.amount}
            </div>
            <BlackButton
              icon={{ src: PlusIcon, alt: "plus icon" }}
              setItems={() => handleSetItems(product.id, product.amount + 1)}
              disabled={inventory <= product.amount}
            />
          </div>
        </span>
      )}
    </div>
  );
};
