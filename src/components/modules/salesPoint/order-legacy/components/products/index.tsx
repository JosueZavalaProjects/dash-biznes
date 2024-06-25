import cn from "classnames";

type ProductProps = {
  name: string;
  isSelected?: boolean;
  index: number;
  setProductSelected: (index: number) => void;
  inventory: number;
  image?: string;
};
export const Product = ({
  name,
  isSelected = false,
  image,
  inventory,
  index,
  setProductSelected,
}: ProductProps) => (
  <div
    cursor-pointer
    className={cn("flex w-full gap-2 border p-3 rounded-xl", {
      "bg-seconday-blue text-white": isSelected,
      "bg-white text-cadet-grey": !isSelected,
      "cursor-pointer": inventory,
      "bg-gray-300": !inventory,
    })}
    onClick={() => (inventory ? setProductSelected(index) : {})}
  >
    <div className="grid justify-items-center items-center w-2/12">
      <span className=" grid justify-items-center items-center w-10 h-10 border rounded-full">
        I
      </span>
    </div>
    <div className="flex items-center w-9/12">{name}</div>
    <div
      className={cn("flex items-center w-1/12", {
        "text-green-primary": inventory > 0,
        "text-red-primary": inventory <= 0,
      })}
    >
      {inventory ? inventory : "N/A"}
    </div>
  </div>
);
