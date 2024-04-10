"use client";
import React from "react";

import Activities from "@/components/modules/activites";

type Props = {};

export default function ActivitiesPage({}: Props) {
  return (
    <div className="flex flex-col gap-5 w-full">
      <Activities />
    </div>
  );
}
