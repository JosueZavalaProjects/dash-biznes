import { ProductCard } from "./components/ProductCard";

export const Order = () => {
  return (
    <section className="grid grid-cols-3 w-3/5 max-h-[34rem] gap-y-8 gap-x-2 p-4 overflow-scroll">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((element) => (
        <ProductCard
          key={`product_card_${element}`}
          title={element.toString()}
        />
      ))}
    </section>
  );
};
