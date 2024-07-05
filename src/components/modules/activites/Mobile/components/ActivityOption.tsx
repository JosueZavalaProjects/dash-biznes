import { Activites } from "@/types/activities";

type ActivityOptionProps = {
  text: string;
  activity: Activites;
  handleOnClick: (activity: Activites) => void;
  isSelected?: boolean;
};

export const ActivityOption = ({
  text,
  activity,
  handleOnClick,
  isSelected,
}: ActivityOptionProps) => {
  return (
    <div
      className={`text-2xl cursor-pointer ${
        isSelected ? "font-semibold text-main-blue" : "text-secondary-gray"
      }`}
      onClick={() => handleOnClick(activity)}
    >
      {text}
    </div>
  );
};
