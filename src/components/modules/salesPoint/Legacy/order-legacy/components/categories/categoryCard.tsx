type CategoryCardProp = {
  name: string;
  index: number;
  setCategorySelected: (index: number) => void;
  isSelected?: boolean;
};

export const CategoryCard = ({
  name,
  index,
  setCategorySelected,
  isSelected = false,
}: CategoryCardProp) => {
  return (
    <div
      className="grid gap-2 cursor-pointer"
      onClick={() => setCategorySelected(index)}
    >
      <div
        className={`w-16 h-16 bg-main-gray rounded-lg ${
          isSelected ? "border-4 border-black" : ""
        }`}
      ></div>
      <div className="grid justify-items-center items-center text-eerie-black capitalize text-xs">
        {name}
      </div>
    </div>
  );
};
