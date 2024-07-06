import cn from "classnames";

enum LabelColor {
  green,
  red,
  blue,
}

type LabelProps = {
  text: string | number;
  color: LabelColor;
};

export const Label = ({ text, color }: LabelProps) => {
  return (
    <span
      className={cn("text-center px-2 py-1.5 rounded-2xl", {
        "text-green-primary bg-[#92FE9D]/[0.20]": color === LabelColor.green,
      })}
    >
      {text}
    </span>
  );
};

export const GreenLabel = ({ text }: { text: string | number }) => {
  return <Label text={text} color={LabelColor.green} />;
};
