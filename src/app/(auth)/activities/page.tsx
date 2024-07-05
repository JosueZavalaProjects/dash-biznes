"use client";
import React from "react";

import ActivitiesDesktop from "@/components/modules/activites/Desktop";
import { ActivitiesMobile } from "@/components/modules/activites/Mobile";
import { useWindowWidth } from "@react-hook/window-size";

type Props = {};

export default function ActivitiesPage({}: Props) {
  const MOBILE_WIDTH = 768;
  const onlyWidth = useWindowWidth();

  return (
    <>
      {onlyWidth > MOBILE_WIDTH && <ActivitiesDesktop />}
      {onlyWidth <= MOBILE_WIDTH && <ActivitiesMobile />}
    </>
  );
}
