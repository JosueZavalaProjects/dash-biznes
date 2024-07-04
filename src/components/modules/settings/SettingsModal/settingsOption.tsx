import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

type SettingsOptionProps = {
  text: string;
  link?: string;
  icon: StaticImport;
  handleCloseModal: () => void;
};
export const SettingsOption = ({
  text,
  icon,
  link,
  handleCloseModal,
}: SettingsOptionProps) => {
  const content = (
    <div className="flex gap-2 items-center">
      <span className="w-8">
        <Image src={icon} alt={`${text}_${link} icon`} width={20} height={20} />
      </span>
      <span className="text-secondary-gray">{text}</span>
    </div>
  );
  return (
    <>
      {!link && (
        <div
          className="w-full p-2 cursor-pointer"
          onClick={() => handleCloseModal()}
        >
          {content}
        </div>
      )}
      {link && (
        <Link
          href={link}
          onClick={() => handleCloseModal()}
          className="w-full p-2"
        >
          {content}
        </Link>
      )}
    </>
  );
};
