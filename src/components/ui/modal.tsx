import { FC, useEffect, useState } from "react";
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
    const element = document.getElementById("portal");
    document.addEventListener("keydown", handleClickEsc);
    document.addEventListener("scroll", () => {
      const newTopWindow = window.document.documentElement.scrollTop;
      element!.style!.top = `${newTopWindow}px`;
    });
    return () => {
      document.removeEventListener("keydown", handleClickEsc);
      document.addEventListener("scroll", () => {
        const newTopWindow = window.document.documentElement.scrollTop;
        element!.style!.top = `${newTopWindow}px`;
      });
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
        id="modal-content"
        className={`absolute items-center justify-center w-screen h-screen bg-opacity-50 bg-eerie-black -backdrop-filter-blur z-20 overflow-y-auto ${
          !show ? "hidden" : "flex"
        }`}
      >
        <div
          className={`fixed top-[10px] left-0 z-40 items-center justify-center w-screen h-screen m-auto ${
            !show ? "hidden" : "flex"
          }`}
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
    </Portal>
  );
};

export default Modal;
