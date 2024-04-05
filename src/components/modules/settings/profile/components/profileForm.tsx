import { Input, KeyValueTypes } from "@/components/ui/input";
import { SimpleButton } from "@/components/ui/simpleButton";
import Text from "@/components/ui/text";

type ProfileFormProps = {
  email: string;
  name: string;
  handleSetValues: (newValue: string, keyValue: KeyValueTypes) => void;
};
export const ProfileForm = ({
  email,
  name,
  handleSetValues,
}: ProfileFormProps) => {
  return (
    <div className="grid pt-8 gap-4">
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Email
        </Text>
        <Input
          value={email}
          setValue={handleSetValues}
          type="text"
          keyValue="email"
        />
      </div>
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Nombre
        </Text>
        <Input
          value={name}
          setValue={handleSetValues}
          type="text"
          keyValue="name"
        />
      </div>
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Contraseña
        </Text>
        <div className="flex-1">
          <SimpleButton>Cambiar Contraseña</SimpleButton>
        </div>
      </div>
    </div>
  );
};
