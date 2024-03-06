type ProductProps = {
  name: string;
  isSelected?: boolean;
  index: number;
  setProductSelected: (index: number) => void;
  image?: string;
};
export const Product = ({
  name,
  isSelected = false,
  image,
  index,
  setProductSelected,
}: ProductProps) => (
  <div
    className={`flex w-full gap-2 border p-3 rounded-xl cursor-pointer ${
      isSelected ? "bg-seconday-blue text-white" : "bg-white text-cadet-grey"
    }`}
    onClick={() => setProductSelected(index)}
  >
    <div className="grid justify-items-center items-center w-2/12">
      <span className=" grid justify-items-center items-center w-10 h-10 border rounded-full">
        I
      </span>
    </div>
    <div className="flex items-center w-10/12">{name}</div>
  </div>
);
