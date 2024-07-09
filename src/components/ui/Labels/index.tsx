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
      className={cn("text-center px-2 py-1.5 rounded-2xl font-bold", {
        "text-green-primary bg-[#92FE9D]/[0.20]": color === LabelColor.green,
        "text-red-third bg-[#CC3232]/[0.20]": color === LabelColor.red,
        "text-white bg-main-blue": color === LabelColor.blue,
      })}
    >
      {text}
    </span>
  );
};

export const GreenLabel = ({ text }: { text: string | number }) => {
  return <Label text={text} color={LabelColor.green} />;
};

export const RedLabel = ({ text }: { text: string | number }) => {
  return <Label text={text} color={LabelColor.red} />;
};

export const BlueLabel = ({ text }: { text: string | number }) => {
  return <Label text={text} color={LabelColor.blue} />;
};
