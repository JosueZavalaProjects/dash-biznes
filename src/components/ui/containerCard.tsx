import React from "react";

export const ContainerCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid w-full p-2 border rounded-lg shadow-lg overflow-x-scroll overflow-x-hidden">
      {children}
    </div>
  );
};
