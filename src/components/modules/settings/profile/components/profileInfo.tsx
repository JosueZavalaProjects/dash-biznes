import Text from "@/components/ui/text";

type ProfileInfoProps = {
  email: string;
  name: string;
};
export const ProfileInfo = ({ email, name }: ProfileInfoProps) => {
  return (
    <div className="grid pt-8 gap-4">
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Email
        </Text>
        <Text size="xl" color="dark" className="w-1/2">
          {email || "email@test.com"}
        </Text>
      </div>
      <div className="flex w-full sm:w-1/2 sm:gap-8">
        <Text size="xl" color="dark" weight="bold" className="w-1/2">
          Contraseña
        </Text>
        <Text size="xl" color="dark" className="w-1/2">
          *******
        </Text>
      </div>
    </div>
  );
};
