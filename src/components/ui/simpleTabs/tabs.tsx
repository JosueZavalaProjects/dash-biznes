import React, { useMemo } from "react";

import useSalesPointState from "@/components/salesPoint/states/sales-point-state";

type HTMLTags = keyof React.JSX.IntrinsicElements;

interface TabPanelProps {
  as?: HTMLTags;
  tabName: string;
  className: string;
  activeClassName: string;
  inactiveClassName: string;
  children?: React.ReactNode;
  [key: string]: any;
}

export function TabPanel({
  as: Component = "div",
  tabName,
  className,
  activeClassName,
  inactiveClassName,
  ...props
}: TabPanelProps) {
  const { tabName: tabNameSelected } = useSalesPointState();

  const calculatedClassName = useMemo(() => {
    return [
      className,
      tabNameSelected === tabName ? activeClassName : inactiveClassName,
    ].join(" ");
  }, [className, activeClassName, inactiveClassName, tabNameSelected, tabName]);

  return (
    <Component
      style={{
        ...props.style,
        visibility: tabNameSelected === tabName ? "visible" : "hidden",
      }}
      id={`tabContent-${tabName}`}
      role="tabpanel"
      className={calculatedClassName}
      {...props}
    />
  );
}
