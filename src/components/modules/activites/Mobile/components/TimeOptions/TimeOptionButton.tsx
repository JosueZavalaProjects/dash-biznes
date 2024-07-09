import { TimeOption } from "@/types/activities";

type TimeOptionProps = {
  text: string;
  value: TimeOption;
  isSelected?: boolean;
  handleOnClick: (option: TimeOption) => void;
};

export const TimeOptionButton = ({
  text,
  value,
  isSelected,
  handleOnClick,
}: TimeOptionProps) => {
  return (
    <button
      className={`text-xl font-semibold capitalize p-2 rounded-3xl w-28 ${
        isSelected ? "bg-main-blue text-white" : "text-secondary-gray"
      }`}
      onClick={() => handleOnClick(value)}
    >
      {text}
    </button>
  );
};
