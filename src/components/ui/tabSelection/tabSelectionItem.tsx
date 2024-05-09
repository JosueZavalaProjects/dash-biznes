type TabSelectionItemProps = {
  optionName: string;
  text: string;
  tabName: string;
  setTabName: (tabName: string) => void;
};

export const TabSelectionItem = ({
  optionName,
  text,
  tabName,
  setTabName,
}: TabSelectionItemProps) => {
  return (
    <li
      className={`flex items-center text-center min-w-[105px] h-12 p-2 cursor-pointer ${
        optionName === tabName
          ? "border-b-2 border-gray-800 text-gray-800"
          : "text-gray-300"
      }`}
      onClick={() => setTabName(optionName)}
    >
      <span className="w-full">{text}</span>
    </li>
  );
};
