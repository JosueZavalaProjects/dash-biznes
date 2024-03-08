import Text from "@/components/ui/text";

type NumberButtonProps = {
  character: number | string;
  handleSetAmount: (character: number | string) => void;
};

export const NumberButton = ({
  character,
  handleSetAmount,
}: NumberButtonProps) => {
  return (
    <div
      className="grid justify-items-center items-cener w-20 h-20 cursor-pointer"
      onClick={() => handleSetAmount(character)}
    >
      <Text color="white" size="4xl" className="flex text-center items-center">
        {character}
      </Text>
    </div>
  );
};
