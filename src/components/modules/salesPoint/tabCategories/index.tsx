import useSalesPointState from "../states/sales-point-state";

export const TabCategories = () => {
  const { categories, categorySelectedIndex } = useSalesPointState();

  return (
    <section className="flex overflow-x-scroll lg:w-3/5">
      <div className="flex gap-4 border-b-2 w-full">
        <TabCategory
          name="Todo"
          index={-1}
          isSelected={categorySelectedIndex === -1}
        />
        {categories &&
          categories.map((category, index) => (
            <TabCategory
              key={`categoryTab_${category}_${index}`}
              name={category}
              index={index}
              isSelected={categorySelectedIndex === index}
            />
          ))}
      </div>
    </section>
  );
};

type TabCategoryProps = {
  name: string;
  isSelected: boolean;
  index: number;
};
const TabCategory = ({ name, isSelected, index }: TabCategoryProps) => {
  const { setCategorySelectedIndex } = useSalesPointState();

  return (
    <div
      className={`grid justify-items-center items-center min-w-[8rem] pb-2 px-4 text-center cursor-pointer ${
        isSelected && "border-b-4 border-blue-600"
      }`}
      onClick={() => setCategorySelectedIndex(index)}
    >
      {name}
    </div>
  );
};
