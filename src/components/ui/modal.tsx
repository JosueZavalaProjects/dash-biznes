import { FC, useEffect } from "react";
import { HiX } from "react-icons/hi";

import cn from "classnames";

import Portal from "@/hoc/portal";

export type Size = "xs" | "md" | "lg" | "xl" | "none";

export type ModalProps = {
  children: React.ReactNode;
  show: boolean;
  timer?: number;
  onClose?: () => void;
  size?: Size;
  escClose?: boolean;
};
const Modal: FC<ModalProps> = ({
  children,
  show,
  timer,
  onClose = () => {},
  size = "xs",
  escClose = true,
}) => {
  const contentStyles = cn(
    " flex flex-col p-7 bg-white border shadow-xl rounded-sm max-h-screen rounded-xl",
    {
      "w-96": size === "xs",
      "w-128": size === "md",
      "w-1/2": size === "lg",
      "w-2/3": size === "xl",
      "": size === "none",
    }
  );

  const handleClickEsc = (event: KeyboardEvent) => {
    if (event.keyCode === 27 && escClose) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleClickEsc);
    return () => {
      document.removeEventListener("keydown", handleClickEsc);
    };
  }, []);

  useEffect(() => {
    if (show && timer) {
      setTimeout(function () {
        onClose();
      }, timer);
    }

    if (show) {
      window.document.body.style.overflow = "hidden";
      return;
    }

    window.document.body.style.overflow = "auto";
  }, [show]);

  if (!show) return null;

  return (
    <Portal>
      <div
        className={`absolute items-center justify-center w-screen h-full bg-opacity-50 bg-eerie-black -backdrop-filter-blur z-20 ${
          !show ? "hidden" : "flex"
        }`}
      >
        <div
          className={`fixed top-0 left-0 z-40 items-center justify-center w-screen h-full ${
            !show ? "hidden" : "flex"
          }`} //bg-opacity-50 bg-eerie-black -backdrop-filter-blur
          onClick={onClose}
        ></div>
        <div className={`absolute z-50 ${contentStyles}`}>
          <div className="absolute top-0 right-0 mt-4 mr-4 z-50">
            <button
              onClick={onClose}
              className="text-2xl text-gray-900 cursor-pointer"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
          {children}
        </div>
      </div>
      {/* <div
        className="flex items-center justify-center absolute top-0 left-0 w-screen h-screen z-30 bg-opacity-50 bg-eerie-black -backdrop-filter-blur"
        onClick={() => alert("Hello")}
      >
      </div> */}
    </Portal>
  );
};

export default Modal;
