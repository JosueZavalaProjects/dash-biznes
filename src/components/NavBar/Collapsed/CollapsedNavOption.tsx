import type { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import Link from "next/link";

type IconType = {
  image: StaticImport;
  width?: number | `${number}`;
  height?: number | `${number}`;
};

type NavOptionProps = {
  icon: IconType;
  link?: string;
  selectedIcon?: IconType;
  isSelected?: boolean;
};

export const NavOption = ({
  isSelected,
  icon,
  link = "/",
  selectedIcon = icon,
}: NavOptionProps) => {
  return (
    <Link href={link}>
      <div
        className={`flex items-center justify-center w-16 h-16 gap-2 p-4 rounded-full font-semibold cursor-pointer ${
          isSelected ? "bg-main-blue text-white" : ""
        }`}
      >
        <span>
          <Image
            src={isSelected ? selectedIcon.image : icon.image}
            width={selectedIcon.width || 27}
            height={selectedIcon.width || 27}
            alt={`${link} icon`}
          />
        </span>
      </div>
    </Link>
  );
};
