import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }: { children: React.ReactElement }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => {
      setMounted(false);
    };
  }, []);

  return mounted
    ? createPortal(children, document.querySelector("#portal") || document.body)
    : null;
};

export default Portal;
