import cn from "classnames";

import { colorLabel } from "@/types/activities";
import { formatCurrency } from "@/utils/common";

type SumaryLabelProps = {
  text: string;
  color: colorLabel;
  amount: number;
};
export const SummaryLabel = ({ text, color, amount }: SumaryLabelProps) => {
  return (
    <div
      className={cn(
        `flex justify-between text-white text-2xl font-semibold p-4 rounded-xl`,
        {
          "bg-gradient-to-r from-seconday-blue to-main-blue":
            color === colorLabel.blue,
          "bg-gradient-to-r from-third-green to-primary-green":
            color === colorLabel.green,
          "bg-gradient-to-r from-pastel-light-red to-pastel-red":
            color === colorLabel.red,
        }
      )}
    >
      <div>{text}</div>
      <div>Total {formatCurrency(amount)}</div>
    </div>
  );
};
