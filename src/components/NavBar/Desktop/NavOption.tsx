import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

type IconType = {
  image: StaticImport;
  width?: number | `${number}`;
  height?: number | `${number}`;
};

type NavOptionProps = {
  text: string;
  icon: IconType;
  link?: string;
  selectedIcon?: IconType;
  isSelected?: boolean;
  handleOnClick?: () => void;
};

export const NavOption = ({
  isSelected,
  text,
  icon,
  link,
  selectedIcon = icon,
  handleOnClick,
}: NavOptionProps) => {
  const content = (
    <div
      className={`flex items-center w-56 gap-2 p-4 rounded-3xl font-semibold cursor-pointer ${
        isSelected ? "bg-main-blue text-white" : ""
      }`}
    >
      <span>
        <Image
          src={isSelected ? selectedIcon.image : icon.image}
          width={selectedIcon.width || 21}
          height={selectedIcon.width || 21}
          alt={`${text} icon`}
        />
      </span>
      {text}
    </div>
  );
  return (
    <>
      {link && <Link href={link}>{content}</Link>}
      {!link && (
        <div onClick={handleOnClick ? () => handleOnClick() : () => {}}>
          {content}
        </div>
      )}
    </>
  );
};
